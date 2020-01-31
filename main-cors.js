const crossDomain = document.querySelector('#crossDomain')
crossDomain.onclick = (() => {
    const request = new XMLHttpRequest()
    request.onreadystatechange = (() => {
        if (request.readyState === 4 && request.status <= 300) {
            console.log(request.response)
        }
    })
    request.open('GET', 'http://localhost:8888/friends')
    request.send()
})