import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox, Form, Input, message, notification, Segmented } from 'antd'
import showPassWord from 'assets/images/show-password.png'
import hidePassWord from 'assets/images/hide-password.png'
import { useAppDispatch } from 'hooks/store'
import { setCredentials } from 'store/auth'
import { storageKeys } from 'constants/storage-keys'
import { i18nKey } from 'locales/i18n'
import i18n from 'locales/i18n'
import services from 'services'
import { LoginParams } from 'interfaces/auth'
import styles from './styles.module.scss'
import authApi from 'services/auth'

function Login() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [value, setValue] = useState<string | number>('EN')
  const StorageService = services.get('StorageService')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onChangeLanguage = (key) => {
    i18n.changeLanguage(key.toLowerCase())
  }

  const onFinish = async (values: any) => {
    try {
      let param: LoginParams = {
        user: {
          email: values.username,
          password: values.password
        }
      }
      const dataLogin: any = await authApi.login(param)

      if (dataLogin.status !== 200) {
        if (dataLogin.error.time_lock !== undefined) {
          form.setFields([
            {
              name: 'password',
              errors: [t(i18nKey.errorMessage.passwordAttemptsExceedLimit)]
            }
          ])
        } else if (dataLogin.error.sign_in_fail !== undefined) {
          form.setFields([
            {
              name: 'password',
              errors: [
                t(i18nKey.errorMessage.attemptsCounter, {
                  count: 5 - dataLogin?.error?.sign_in_fail
                })
              ]
            }
          ])
        } else {
          notification.error({
            message: t(i18nKey.commonMessages.error),
            description: t(i18nKey.errorMessage.login)
          })
        }
      } else {
        const infoUser: any = {
          token: dataLogin?.data.token,
          user: dataLogin?.data.current_user
        }
        dispatch(setCredentials(infoUser))
        StorageService.set(storageKeys.authProfile, infoUser)
        navigate('/')
      }
    } catch (error: any) {
      if (error.response) {
        message.error(error.response.data.messages)
      }
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    onChangeLanguage(value)
  }, [value])
  return (
    <div className={styles.wrapper}>
      <div className={styles.switchLangBtn}>
        <Segmented
          className={styles.btnChooseLang}
          options={['EN', 'VN']}
          value={value}
          onChange={setValue}
        />
      </div>
      <div className={styles.formWrapper}>
        <Form
          form={form}
          name='login'
          wrapperCol={{ span: 24 }}
          layout='vertical'
          className={styles.loginContent}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='on'
        >
          <Form.Item
            label={t(i18nKey.label.userName)}
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t(i18nKey.label.password)}
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              iconRender={(visible) => (
                <img src={visible ? showPassWord : hidePassWord} alt='hide pass' />
              )}
            />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>{t(i18nKey.label.rememberMe)}</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {t(i18nKey.button.submit)}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
