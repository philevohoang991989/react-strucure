import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox, Form, Input, notification, message, Segmented } from 'antd'
import showPassWord from 'assets/images/show-password.png'
import hidePassWord from 'assets/images/hide-password.png'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useLoginMutation } from 'services/auth'
import { useAppDispatch } from 'hooks/store'
import { setCredentials } from 'store/auth'
import { storageKeys } from 'constants/storage-keys'
import { i18nKey } from 'locales/i18n'
import i18n from 'locales/i18n'
import services from 'services'
import { LoginParams } from 'interfaces/auth'
import styles from './styles.module.scss'

function Login() {
  const [login] = useLoginMutation()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [value, setValue] = useState<string | number>('EN')
  const StorageService = services.get('StorageService')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onChangeLanguage = (key) => {
    i18n.changeLanguage(key.toLowerCase()).then(() => message.success('Success'))
  }

  const onFinish = async (values: any) => {
    try {
      let param: LoginParams = {
        user: {
          email: values.username,
          password: values.password
        }
      }
      const dataLogin = await login(param).unwrap()

      const infoUser: any = {
        token: dataLogin?.token,
        user: dataLogin?.current_user
      }
      dispatch(setCredentials(infoUser))
      StorageService.set(storageKeys.authProfile, infoUser)
      navigate('/')
    } catch (err) {
      notification.error({
        message: 'Fetch login error',
        className: 'notification-error',
        duration: 5,
        icon: <CloseCircleOutlined />
      })
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
