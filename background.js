const isYoutube = (tab_id, data, tab)=>{
    if(tab.url){
        chrome.tabs.sendMessage(tab_id, {
            message: "loop_url_changed",
            url: data.url
        })
    }
}

chrome.tabs.onUpdated.addListener(isYoutube);