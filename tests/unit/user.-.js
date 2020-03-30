const User = require('../../models/userMo');
const jwt = require('jsonwebtoken')
const config = require('config');

describe('user.genAuthToken',() =>{
    it('should return valid JWT token', () => {
        const user = new User({
            _id: 1,
            name: "Jane Deng",
            role: "sale"
        })
        const token = user.genAuthToken()
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        expect(decoded).toMatchObject({_id: 1, role: "sale"})
    })
})