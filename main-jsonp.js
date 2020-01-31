const crossDomain = document.querySelector('#crossDomain')

/* crossDomain.onclick = (() => {
    const random = `myLocalHostMethod`+Math.random()
    window[random] = (data) => {
        console.log(data)
        console.log(typeof data)
    }
    let script = document.createElement('script')
    script.src = `http://localhost:8888/friends?callback=${random}`
    script.onload = () => {
        script.remove()
    }
    document.body.appendChild(script)
}) */

// 封装为 jsonp 函数，返回一个 promise
function jsonp(url) {
    return new Promise((resolve,reject) => {
        const random = `myLocalHostMethod`+Math.random()
        window[random] = (data) => {
            resolve(data)
        }
        let script = document.createElement('script')
        script.src = `${url}?callback=${random}`
        script.onload = () => {
            script.remove()
        }
        script.onerror = () => {
            reject()
        }
        document.body.appendChild(script)     
    })
}

crossDomain.onclick = () => {
    jsonp('http://localhost:8888/friends').then((data) => {
        console.log(data)
    })
}