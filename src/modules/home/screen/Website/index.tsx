import React from 'react';
import {Accordion} from '@components'
import { useTranslation } from "react-i18next";

function Welcome() {
  const { t } = useTranslation();

  return (
   <small>{t("website")}</small>
  )

}

export default Welcome;