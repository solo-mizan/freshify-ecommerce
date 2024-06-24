'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('আপনি লগআউট করেছেন।')
      } catch (_) {
        setError('আপনি ইতিমধ্যে লগআউট করেছেন!')
      }
    }

    performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'এখন কি করতে চান?'}
            <br />
            {typeof productsPage === 'object' && productsPage?.slug && (
              <Fragment>
                {` কেনাকাটা করতে `}
                <Link className={classes.textBold} href={`/${productsPage.slug}`}>
                  এখানে ক্লিক করুন।
                </Link>{' '}
              </Fragment>
            )}
            <br />
            {` পুনরায় লগইন করতে `}
            <Link className={classes.textBold} href="/login">
              এখানে ক্লিক করুন।
            </Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
