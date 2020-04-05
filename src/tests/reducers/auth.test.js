import authReducer from '../../reducers/auth';

const actions = [{
    type: 'LOGIN',
    uid: "userid"
}, {
    type: 'LOGOUT'
}];
test('set uid on login', () => {
    const state = authReducer(undefined, actions[0]);
    expect(state.uid).toBe(actions[0].uid);
});

test('remove uid on logout', () => {
    const state = authReducer(undefined, actions[1]);
    expect(state.uid).not.toBeDefined();
    expect(state).toEqual({});
});