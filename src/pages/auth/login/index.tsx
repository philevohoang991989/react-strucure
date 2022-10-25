import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, notification } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useLoginMutation } from 'services/auth'
import { useAppDispatch } from 'hooks/store'
import { setCredentials } from 'store/auth'
import { storageKeys } from 'constants/storage-keys'
import services from 'services'
import styles from './styles.module.scss'

function Login() {
  const [login] = useLoginMutation()
  const StorageService = services.get('StorageService')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    try {
      await login(values).unwrap()
      console.log({ values })

      const username = values.username
      const fakeUser: any = {
        token: 'token',
        user: {
          username,
          role: 1
        }
      }
      dispatch(setCredentials(fakeUser))
      StorageService.set(storageKeys.authProfile, fakeUser)
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
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
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
            <Input.Password />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
