
let inputBtn = document.getElementById('input-btn')
let inputEl = document.getElementById('input-el')
let myLeads = []
let ulEl = document.getElementById('ul-el')
let deleteBtn = document.getElementById('delete-btn')
let tabBtn = document.getElementById('tab-btn')
let leadsFromLocalstorage = JSON.parse(localStorage.getItem('myLeads')) 


tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        let url = tabs[0].url
        myLeads.push(url)
        localStorage.setItem(myLeads, JSON.stringify(myLeads))    
        render(myLeads)
    })
  
})


if (leadsFromLocalstorage) {
    myLeads = leadsFromLocalstorage
    render(myLeads)
}

deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    myLeads = []
  
    render(myLeads)
})

inputBtn.addEventListener('click', function () {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads) {
    let listItems = [] 
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li>
                        <a target='_blank' href=${leads[i]}>${leads[i]}</a>      
                    </li>`
      }
      
      ulEl.innerHTML = listItems 
      
}