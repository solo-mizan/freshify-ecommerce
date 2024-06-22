'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              আপনার কার্ট খালি।
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  <br /> {`কেনাকাটা করতে `}
                  <Link style={{ fontWeight: 700 }} href={`/${productsPage.slug}`}>
                    এখানে ক্লিক করুন।
                  </Link>
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  <br /> {`সেভ করা কার্ট দেখতে `}
                  <Link style={{ fontWeight: 700 }} href={`/login?redirect=%2Fcart`}>
                    লগ ইন{' '}
                  </Link>
                  {'করুন।'}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                {/* CART LIST HEADER */}
                <div className={classes.header}>
                  <p>পণ্য</p>
                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p>পরিমাণ</p>
                  </div>
                  <p className={classes.headersubtotal}>সর্বমোট</p>
                </div>
                {/* CART ITEM LIST */}
                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID },
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className={classes.summary}>
                <div className={classes.row}>
                  <h6 className={classes.cartTotal}>অর্ডার সারাংশ</h6>
                </div>

                <div className={classes.row}>
                  <p className={classes.cartTotal}>ডেলিভারি চার্জ</p>
                  <p className={classes.cartTotal}>0 টাকা</p>
                </div>

                <div className={classes.row}>
                  <p className={classes.cartTotal}>সর্বমোট</p>
                  <p className={classes.cartTotal}>{cartTotal.formatted}</p>
                </div>

                <Button
                  className={classes.checkoutButton}
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Checkout' : 'Login to checkout'}
                  appearance="primary"
                />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
