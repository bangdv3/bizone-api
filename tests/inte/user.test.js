
const request = require('supertest');
const User = require('../../src/models/userMo')
// let server; 

describe('/api/users', ()=>{
    beforeEach(()=> {server = require('../../src/index')});
    afterEach(async()=> {
        server.close()
        await User.deleteMany({}); 
    }); 
    
    describe('GET user ', ()=>{
        it('should return all users', async()=>{
            const testUsers = [
                {name: 'Bang Dang', email: 'bbox1168@gmail.com', password: '12345', role: 'admin'},
                {name: 'Jane Nguyen', email: 'jane@gmail.com', password: '12345', role: 'sale'},
                {name: 'Anh Bui', email: 'anhbui@gmail.com', password: '12345', role: 'opt'},
                {name: 'Le Long', email: 'bbox1368@gmail.com', password: '12345', role: 'customer'}
            ]
            User.collection.insertMany(testUsers); 

            const res = await request(server).get('/api/users')
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(4);
            expect(res.body.some(u => u.email === 'bbox1168@gmail.com'))
            expect(res.body.some(u => u.email === 'jane@gmail.com'))
            expect(res.body.some(u => u.email === 'anhbui@gmail.com'))  
            expect(res.body.some(u => u.email === 'bbox1368@gmail.com'))
        })
        it('should not found the user 1', async()=>{
            const res = await (await request(server).get('/api/users/1'))
            expect(res.status).toBe(404);
        })
        // it('should retur')
    })
    
    // describe('POST user', ()=>{
    //     it('should create user by email',()=> {
    //         const testUser = {name: 'Bang Dang', email: 'bangdv3@gmail.com', password: '12345', role: 'admin'}
    //         const res = await(await request(server).post('/api/'))
    //     })
    // })
})