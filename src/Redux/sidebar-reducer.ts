let initialState = {};

type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state;
    }
}
export default sidebarReducer;