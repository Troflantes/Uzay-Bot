exports.run = (client, message, args) => {
    message.channel.send({embed: {
    description: ('Pingin:  **' + (client.ping) + '**')
    }})
  }