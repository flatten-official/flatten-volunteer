import { useSelector } from "react-redux";
import React from "react";
import { useTranslation } from "react-i18next";

const FollowUpId = () => {
  const followUpId = useSelector((state) => state.volunteerForm.followUpId);
  const { t } = useTranslation("InitialSurvey");
  return (
    <>
      <h3>{t("askToGiveFollowUpId")}</h3>
      <h3>{followUpId}</h3>
    </>
  );
};

export default FollowUpId;
