import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ManualLocationPicker from "./ManualLocationPicker";
import Loading from "../../../../components/Loading";
import Types from "../../../actionTypes";
import PropTypes from "prop-types";

export const LocationObj = (lat, lng, accuracy, altitude, wasManual) => ({
  lat: lat,
  lng: lng,
  accuracy: accuracy,
  altitude: altitude,
  wasManual: wasManual,
});

export const LocationPicker = ({ onLocationFound }) => {
  const STATUS = {
    requested: "LOCATION_REQUESTED",
    failed: "LOCATION_FAILED_AUTO",
    manual: "LOCATION_MANUAL",
  };

  const { t } = useTranslation("InitialSurvey");

  const [currentStatus, setStatus] = useState(STATUS.requested);

  /**
   * Gets the location from the browser (in LOCATION_REQUESTED state while fetching)
   */
  const getBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationFound(
          LocationObj(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy,
            position.coords.altitude,
            false
          )
        );
      },
      () => setStatus(STATUS.failed)
    );

    setTimeout(() => setStatus(STATUS.failed), 30000); // after a while set to failed as a worst case
  };

  // TODO Cleanup to avoid memory leaks
  useEffect(getBrowserLocation, []); // Call the function on start

  // eslint-disable-next-line default-case
  switch (currentStatus) {
    case STATUS.requested:
      return <Loading text={t("location.loading")} />;
    case STATUS.failed:
      return (
        <>
          <h4>{t("location.isRequiredPrompt")}</h4>
          <br />
          {/*TODO this button seems to do nothing which is confusing*/}
          <Button variant="light" size="lg" onClick={getBrowserLocation}>
            {t("location.rePrompt")}
          </Button>
          <Button
            variant="light"
            size="lg"
            onClick={() => setStatus(STATUS.manual)}
          >
            {t("location.pickManuallyPrompt")}
          </Button>
        </>
      );
    case STATUS.manual:
      return (
        <ManualLocationPicker
          onSubmit={onLocationFound}
          onCancel={() => setStatus(STATUS.failed)}
        />
      );
  }
};

LocationPicker.propTypes = {
  onLocationFound: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onLocationFound: (location) =>
    dispatch({ type: Types.SET_LOCATION, payload: location }),
});

export const ConnectedLocationPicker = connect(
  null,
  mapDispatchToProps
)(LocationPicker);
