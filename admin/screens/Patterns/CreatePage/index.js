import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';

import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Link } from '@strapi/design-system/Link';
import ArrowLeft from '@strapi/icons/ArrowLeft';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import Check from '@strapi/icons/Check';
import { GridItem, Grid } from '@strapi/design-system/Grid';
import { request, useNotification } from '@strapi/helper-plugin';
import { Loader } from '@strapi/design-system/Loader';

import getTrad from '../../../helpers/getTrad';
import schema from './utils/schema';

import pluginId from '../../../helpers/pluginId';
import Center from '../../../components/Center';
import Select from '../../../components/Select';
import LabelField from '../../../components/LabelField';
import PatternField from '../../../components/PatternField';

const CreatePattternPage = () => {
  const { push } = useHistory();
  const toggleNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const [contentTypes, setContentTypes] = useState([]);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setLoading(true);
    request(`/path/info/getContentTypes`, { method: 'GET' })
      .then((res) => {
        setContentTypes(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleEditRoleSubmit = (values, { setSubmitting, setErrors }) => {
    request(`/path/pattern/create`, {
      method: 'POST',
      body: {
        data: values,
      },
    })
      .then((res) => {
        push(`/settings/${pluginId}/patterns`);
        toggleNotification({ type: 'success', message: { id: getTrad('notification.success.submit') } });
        setSubmitting(false);
      })
      .catch((err) => {
        if (err.response.payload[0].message === 'This attribute must be unique') {
          setErrors({ code: err.response.payload[0].message });
        } else {
          toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
        }
        setSubmitting(false);
      });
  };

  const validatePattern = async (values) => {
    const errors = {};

    await request(`/path/pattern/validate`, {
      method: 'POST',
      body: {
        pattern: values.pattern,
        modelName: values.contenttype,
      },
    })
      .then((res) => {
        if (res.valid === false) {
          errors.pattern = res.message;
        }
      })
      .catch(() => {
      });

    return errors;
  };

  if (loading || !contentTypes) {
    return (
      <Center>
        <Loader>Loading content...</Loader>
      </Center>
    );
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{ label: '', pattern: '', contenttype: '', languages: [] }}
      onSubmit={handleEditRoleSubmit}
      validationSchema={schema}
      validate={validatePattern}
    >
      {({ handleSubmit, values, handleChange, errors, touched, isSubmitting, setFieldValue }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <HeaderLayout
            title={formatMessage({ id: 'path.settings.page.patterns.title', defaultMessage: "Add new pattern" })}
            subtitle={formatMessage({ id: 'path.settings.page.patterns.title', defaultMessage: "Add a pattern for automatic URL alias generation." })}
            as="h2"
            navigationAction={(
              <Link startIcon={<ArrowLeft />} to={`/settings/${pluginId}/patterns`}>
                {formatMessage({
                  id: 'global.back',
                  defaultMessage: 'Back',
                })}
              </Link>
            )}
            primaryAction={(
              <Button type="submit" loading={isSubmitting} startIcon={<Check />}>
                {formatMessage({
                  id: 'global.save',
                  defaultMessage: 'Save',
                })}
              </Button>
            )}
          />
          <ContentLayout>
            <Stack spacing={7}>
              <Box
                background="neutral0"
                hasRadius
                shadow="filterShadow"
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={7}
                paddingRight={7}
              >
                <Stack spacing={4}>
                  <Typography variant="delta" as="h2">
                    {formatMessage({
                      id: getTrad('EditPage.form.roles'),
                      defaultMessage: 'Pattern details',
                    })}
                  </Typography>
                  <Grid gap={4}>
                    <GridItem col={6}>
                      <Select
                        name="contenttype"
                        list={contentTypes}
                        value={values.contenttype || ''}
                        setFieldValue={setFieldValue}
                        label={formatMessage({
                          id: 'global.asdfe',
                          defaultMessage: 'Content type',
                        })}
                        error={
                          errors.contenttype && touched.contenttype
                            ? formatMessage({ id: errors.contenttype, defaultMessage: 'Invalid value' })
                            : null
                        }
                      />
                    </GridItem>
                    <GridItem col={12} />
                    <GridItem col={6}>
                      <LabelField
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        hint={(code) => (
                          <Typography>Machine name: {code} </Typography>
                        )}
                      />
                    </GridItem>
                    <GridItem col={12} />
                    {(values.contenttype !== '') && (
                      <GridItem col={6}>
                        <PatternField
                          values={values}
                          uid={values.contenttype}
                          setFieldValue={setFieldValue}
                          hint={(hint) => (
                            <Typography variant="pi">{hint}</Typography>
                          )}
                          error={
                            errors.pattern && touched.pattern
                              ? errors.pattern
                              : null
                          }
                        />
                      </GridItem>
                    )}
                  </Grid>
                </Stack>
              </Box>
            </Stack>
          </ContentLayout>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePattternPage;
