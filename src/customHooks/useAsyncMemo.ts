import { useReducer, useEffect } from "react";

//// asynchronous useMemo hook

interface IInitialData<T> {
  error?: object | null;
  pending: boolean;
  data: T;
}

interface IActionData<T> {
  type: string;
  data: T;
  error?: object | null;
}

export function useAsyncMemo<T>(
  callback: () => Promise<any>,
  deps: string[],
  initialData: T
) {
  const initialState = {
    error: null,
    pending: false,
    data: initialData,
  };
  const [state, dispatch] = useReducer(
    (state: IInitialData<T>, action: IActionData<T>) => {
      switch (action.type) {
        case "START": {
          return { ...state, pending: true };
        }
        case "SUCCESS": {
          return { ...state, pending: false, error: null, data: action.data };
        }
        case "ERROR":
        default: {
          return { ...state, pending: false, error: action.error };
        }
      }
    },
    initialState
  );

  useEffect(() => {
    let canceled = false;

    async function effectHandler() {
      dispatch({ type: "START", data: initialData });

      try {
        const data = await callback();
        if (!canceled) {
          dispatch({ type: "SUCCESS", data });
        }
      } catch (error) {
        if (!canceled) {
          dispatch({ type: "ERROR", error, data: initialData });
        }
      }
    }

    effectHandler();

    return () => {
      canceled = true;
    };
  }, deps);

  return [state];
}
