import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, notification } from 'antd'
import showPassWord from 'assets/images/show-password.png'
import hidePassWord from 'assets/images/hide-password.png'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useLoginMutation } from 'services/auth'
import { useAppDispatch } from 'hooks/store'
import { setCredentials } from 'store/auth'
import { storageKeys } from 'constants/storage-keys'
import services from 'services'
import styles from './styles.module.scss'

function Login() {
  const [login] = useLoginMutation()
  const [form] = Form.useForm()
  const StorageService = services.get('StorageService')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    try {
      await login(values).unwrap()
      console.log({ values })

      const username = values.username
      const infoUser: any = {
        token: 'token',
        user: {
          username,
          role: 1
        }
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
  return (
    <div className={styles.wrapper}>
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
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
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
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
