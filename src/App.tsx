// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer, ScrollToTop } from './components'

import {
  Home,
  Error,
  Contact,
  SingleProduct,
  Checkout,
  Products,
  Cart,
  SuccessfulPayment,
  HowToUsePage
} from './pages'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/contact'>
            <Contact />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/products/:slug' children={<SingleProduct />} />
          <Route exact path='/checkout'>
            <Checkout />
          </Route>
          <Route exact path='/how-to-use'>
            <HowToUsePage />
          </Route>
          <Route exact path='/successful_payment'>
            <SuccessfulPayment />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </>
  )
}