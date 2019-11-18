const connect = (roomid, username) => {
  document.querySelector('#send').addEventListener('submit', async (e) => {
    e.preventDefault()
    const msg = document.querySelector('#input').value
    await fetch(`/chat/${roomid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, msg })
    })
    document.querySelector('#input').value = ''
  })

  const eventSrc = new EventSource(`/chat/${roomid}`)
  eventSrc.addEventListener('message', (event) => {
    console.info(event)
    const msgWrapper = document.createElement('div')
    msgWrapper.classList.add('message')
    const userWrapper = document.createElement('span')
    userWrapper.classList.add('username')
    if (JSON.parse(event.data).username === username) {
      userWrapper.classList.add('me')
    }
    const user = document.createTextNode(`${JSON.parse(event.data).username}: `)
    userWrapper.append(user)
    const msg = document.createTextNode(`${JSON.parse(event.data).msg}`)
    msgWrapper.append(userWrapper)
    msgWrapper.append(msg)
    document.querySelector('#chat').append(msgWrapper)
    document.querySelector('#chat').scrollBy(0, window.innerHeight)
  })
}

(() => {
  const roomid = document.querySelector('#roomid').value
  const username = document.querySelector('#username').value
  connect(roomid, username)
})()