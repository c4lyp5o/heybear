exports.theHome = async (req, res) => {
    res.render('chat', { title: 'HeyBear' });
}

// exports.getMessage = async (req, res) => {
//     const messages = await Chat.find({});
//     res.send(messages);
// }

// exports.sendMessage = async (req, res) => {
//     const message = new Chat(req.body);
//     message.save((err) =>{
//       if(err)
//         sendStatus(500);
//       res.sendStatus(200);
//     });
// }

exports.test = async (req, res) => {
    res.render('newchat', { title: 'HeyBear' });
}