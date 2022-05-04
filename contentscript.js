let alreadyDoneIt = false;
let start;
let end;
let intervalHandle;

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse)=>{
        if(request.message == "loop_url_changed"){
            if(location.href.match(/youtube.com/)){
               if(alreadyDoneIt) return
               alreadyDoneIt = true
               addLooper()
               start = undefined;
               end =  undefined;
               intervalHandle = undefined
            }
        }
    }
)

function addLooper(){
    const htmlVideoContainer = document.querySelector('.html5-video-container')
    htmlVideoContainer.style.height = "100%"
    htmlVideoContainer.style.width = "100%"
    let videoDIV = document.querySelector('video')


    let looper = document.querySelector('div')

    looper.style.position= "absolute",
    looper.style.height= "35px",
    looper.style.width= "35px",
    // looper.style.background= "red",
    looper.style.borderRadius = "50%",
    looper.style.top= "10px",
    looper.style.left= "10px"
    looper.style.boxShadow = "0px 0px 10px rgb(255 255 255 / 40%)"

    document.querySelector('style').textContent += `
        .YouLoopDIV{
            transition: .5s ease;
            opacity: 0; 
            background: url("https://res.cloudinary.com/dyrneab5i/image/upload/v1651223253/icon_caonx2.png"), red; background-size: cover; background-position: center;
            cursor: pointer;
            z-index: 200;
        }
        .YouLoopDIV:hover{
            transform: scale(1.1);
            
        }
    `
    
    
    looper.className = "YouLoopDIV"

    htmlVideoContainer.addEventListener('mouseover', (e)=>{
        looper.style.opacity = "1"
        looper.style.boxShadow = "0px 0px 10px rgb(0 0 0 / 40%)"
    })
    htmlVideoContainer.addEventListener('mouseout', (e)=>{
        looper.style.opacity = "0"
        looper.style.boxShadow = "0px 0px 10px rgb(0 0 0 / 80%)"
    })

    looper.addEventListener('click', (e)=>{
        if(!start) {
            start = videoDIV.currentTime
            videoDIV.addEventListener('pause', (e)=>{
                videoDIV.play()
            }, {once: true})    
            return
        }
        if(!end){
            end = videoDIV.currentTime
            videoDIV.addEventListener('pause', (e)=>{
                videoDIV.play()
            }, {once: true})

            if(!intervalHandle){
                console.log("%c Adding the interval", "font-size: 30px")
                intervalHandle = setInterval(()=>{
                    if(videoDIV.currentTime > end){
                        videoDIV.currentTime = start
                    }
                }, 100)
            }    
            
        }else{
            console.log("%c REMOVING the interval", "font-size: 30px; color: red;")
            clearInterval(intervalHandle)
            intervalHandle = undefined
            start = undefined
            end = undefined
            videoDIV.addEventListener('pause', (e)=>{
                videoDIV.play()
            }, {once: true})
        }
        

        

    })

    looper.addEventListener('mouseover', (e)=>{
        videoDIV.style.pointerEvents = "none"
    })
    looper.addEventListener('mouseout', (e)=>{
        videoDIV.style.pointerEvents = ""
    })

    htmlVideoContainer.appendChild(looper)
}