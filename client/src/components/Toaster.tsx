import {
  Toaster,
  createToaster,
} from "@chakra-ui/react";


export const toaster = createToaster({
  placement: "top-end",
});


const AppToaster = () => {

  return (
    <Toaster toaster={toaster}>
      {(toast) => (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            background: toast.type === "error"
              ? "#E53E3E"
              : "#38A169",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {toast.title}
          {toast.description && (
            <div>
              {toast.description}
            </div>
          )}
        </div>
      )}
    </Toaster>
  );

};


export default AppToaster;