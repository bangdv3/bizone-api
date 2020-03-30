const request = require('supertest');
const Customer = require('../../src/models/customerMo')
const User = require('../../src/models/userMo')


describe('/api/customers', ()=>{
    
    describe('GET ', () => {
        beforeEach(()=> { server = require('../../src/index')})
        afterEach(async()=> {
            await Customer.deleteMany({});
            server.close()
            
        })

        it('shoudld return 401 - for miss authentication ', async()=>{ 
            const res = await request(server).get('/api/customers/all')  
            expect(res.status).toBe(401); 
        })
        it('shoudld return 200 - all customers ', async()=>{ 
            const token = new User().genAuthToken()

            const res = await request(server)
                .get('/api/customers/all')  
                .set('x-auth-token', token)
            expect(res.status).toBe(200); 
        })
        
    })
    describe('POST ', () =>{
        let token;
        let customerRaw;

        const sendRequest = async() =>{
            return await request(server)
            .post('/api/customers')
            .set('x-auth-token', token)
            .send(customerRaw)
        }

        beforeEach(()=> { 
            token = new User().genAuthToken() 
            customerRaw = { name: "Le Long", email: "lelong@g.com" }
            server = require('../../src/index') 
        })
        afterEach(async()=> {
            server.close()
            await Customer.deleteMany({});
        })
        it('shoudld return 401 - for miss authentication ', async()=>{ 
            token = '';
            const res = await sendRequest()
            expect(res.status).toBe(401); 
        })
        it('shoudld return 400 - customer name too short ', async()=>{ 
            customerRaw.name = 'Le';
            const res = await sendRequest()
            expect(res.status).toBe(400); 
        })
        it('shoudld return 400 - customer invalid email  ', async()=>{ 
            customerRaw.email = 'Le';
            const res = await sendRequest()
            expect(res.status).toBe(400); 
        })


        it('shoudld return 200 - for new customer ', async()=>{
            //happy path
            const res =  await sendRequest() 
            const customer = await Customer.findOne({email: 'lelong@g.com'})
            expect(customer).not.toBeNull(); 
        })
    })
})