import mock from 'mockjs';
mock.setup({timeout:'200-600'});
mock.mock('/api/test',(options)=>{
     return {
        options:options,
        testData:'this mock api test'
     }
});