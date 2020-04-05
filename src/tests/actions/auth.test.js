import {login, logout} from '../../actions/auth';

test('should generate login action object', () => {
    const userid = "25dhsf76325"
    const action = login(userid);
    expect(action).toEqual({
        type:"LOGIN",
        uid: "25dhsf76325"
    });
});
                                
test('should generate logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type:"LOGOUT"
    });
});

