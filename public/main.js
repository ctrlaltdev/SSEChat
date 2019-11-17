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
    const msg = document.createTextNode(`${JSON.parse(event.data).username}: ${JSON.parse(event.data).msg}`)
    msgWrapper.append(msg)
    document.querySelector('#chat').append(msgWrapper)
  })
}

(() => {
  const roomid = document.querySelector('#roomid').value
  const username = document.querySelector('#username').value
  connect(roomid, username)
})()