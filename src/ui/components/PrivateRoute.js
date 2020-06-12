import React from "react";
import { AUTH_SUCCESS, logout } from "../../backend/auth/authActions";
import { checkHasExpired, hasPermission } from "../../backend/auth/authApi";
import { Routes } from "../../config";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "react-bootstrap";

const ExpireModal = () => {
  const { t } = useTranslation("Navbar");
  const dispatch = useDispatch();

  return (
    <Modal show={true} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{t("expire.header")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("expire.body")}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => dispatch(logout())}>
          {t("expire.ok")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function PrivateRoute({ requiredPermission, comp: Component, ...rest }) {
  const auth = useSelector((state) => state.auth);
  const authed = hasPermission(auth, requiredPermission);
  const { t } = useTranslation("Admin");

  if (authed)
    return (
      <Route
        render={() =>
          checkHasExpired(auth.user.expiry) ? <ExpireModal /> : <Component />
        }
        {...rest}
      />
    );
  else {
    // if logged in but without the right permission to use this page
    if (auth.state === AUTH_SUCCESS) return <div>{t("unauthorized")}</div>;
    else
      return (
        <Route
          render={() => <Redirect to={{ pathname: Routes.auth }} />}
          {...rest}
        />
      );
  }
}

export default PrivateRoute;
