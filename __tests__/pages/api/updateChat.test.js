// updateChat.test.js
const updateChat = require('../../../pages/api/updateChat');

describe('updateChat', () => {
  it('responds with status 200 and updates the chat', async () => {
    const req = {
      method: 'POST',
      body: {
        chatName: 'testChat',
        prompt: 'Test prompt',
        answer: 'Test answer',
        isNewChat: false,
      },
    };
    const res = {
      status: function(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json: function(obj) {
        this.body = obj;
        return this;
      },
    };

    await updateChat(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Chat updated successfully' });
  });
});
