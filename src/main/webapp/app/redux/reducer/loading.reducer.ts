const initialState = {
  isLoading: false,
  actionName: '',
  specialKey: null
};

const getActionType = (actionType: string) => {
  const parts = actionType.split('_');
  return parts[parts.length - 1];
};

const getActionName = (actionType: string) => {
  const parts = actionType.split('_');
  parts.pop();
  return parts.join('_');
};

export const handleActionStatus = (actionType: string, payload: any) => {
  switch (actionType) {
    // todo
    default:
      return null;
  }
};

export type LoadingState = Readonly<typeof initialState>;

export default (state: LoadingState = initialState, action): LoadingState => {
  const type = getActionType(action.type);
  handleActionStatus(action.type, action.payload);
  switch (type) {
    case 'FULFILLED':
    case 'REJECTED':
      return {
        isLoading: false,
        actionName: action.type,
        specialKey: action.specialKey || null
      };
    case 'PENDING':
      return {
        isLoading: true,
        actionName: action.type,
        specialKey: action.specialKey || null
      };
    default:
      return state;
  }
};
