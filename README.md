## Self Brand Outlet
Self Brand Outlet is a simple demo e-commerce application built with React on the frontend, and Node.JS, Mongoose, and Express on the backend. It is a single page application rendering React from the server. It features essential e-commerce functionality such as different views showcasing objects, search functionality, 
as well as a shopping cart and checkout.

As an online shop, it also serves as a exhibition of objects that artists have created as ordinary commodities to be bought and sold. The shop itself is a document of various ways artists have approached the idea of commerce in their practices. 

## Background
While I have been thinking of the idea for using an online shop as an exhibition of commodities as artworks for a while, a large part of what motivated this project was technical experimentation.

For the structure of the app, I decided on using the MERN stack, as it increases in popularity and is driving the development of modern web applications.

Having practiced working with Node and Express on the backend, this project was built with the outcome in mind of creating a fully functioning demo site through which I could see how the MERN stack worked in production. I also had wanted to experiment with different ideas and libraries, one of which was to implement a functioning payment system through Stripe. 

This project was also a way to challenge myself in terms of web design. Taking inspiration from Japanese graphic designers and their use of typography, particularly [Yoshihisa Shirai](http://www.dnp.co.jp/CGI/gallery/schedule/detail.cgi?l=2&t=1&seq=00000709), I wanted to see if I could think of more interesting ways to structure the page than the standard Bootstrap look. I sketched the application out on paper first, to get a different approach to spacing and structuring each box element. 

![alt text](http://www.dnp.co.jp/gallery/schedule/schedule_images/IMG_6_00000709.jpg)

## Tech/Frameworks Used

<b>Languages</b>
- Javascript

<b>Web Frameworks</b>
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://github.com/expressjs)

<b>Database</b>
- [MongoDB](https://www.mongodb.com/)

<b>Middleware</b>
- [React Router](https://reacttraining.com/react-router/web)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

<b>Components</b>
- [React Slick](https://github.com/akiran/react-slick)
- [React Responsive Modal](https://www.npmjs.com/package/react-responsive-modal)

## Features
- User can create accounts and log in with their email addresses and a password. Validation errors will display on the page.
- Registered users can add items to a shopping cart.
- Registered users can place orders for the objects in their shopping cart. Stripe handles the payment process and sends through a receipt for each order.

- On the home page, user can view featured artists and featured items.
- Unique links exist for each artist. Each artist page lists all the items associated with them, as well as artist bios and photos.
- On the all items page, user can view all items or search for them with a dynamic search bar. 
- By clicking on objects, a modal pops up containing extra information and photos about the object. By clicking 'add to cart', they can add the object to a dynamically updating shopping cart. 
- By clicking the shopping cart at the top of the page, users can review their items, and update quantities.

## API Reference

<b>Payment</b>
- [Stripe API](https://stripe.com)

## How to use?
Recommended usage of the app:
1) Click 'Sign Up' in the menu bar, and enter valid details to create an account.
2) You should be automatically logged in after signing up. If re-accessing the site you can login through the menu bar.
3) Browse objects on the home page and explore the different works by artist. Text links are underlined. 
4) Add objects to the shopping cart as desired. 
5) Click on the shopping cart under the menu bar to review purchases. 
6) Click on 'To Payment' to proceed to the payment form. Enter fake details as instructed, and then click 'Pay Now'. Stripe will generate a receipt. In the console you should see the order has been sent through to Stripe as a demo payment.

## Contribute

I would welcome any suggestions or contributions to this project ! When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with me [ritz.wu@outlook.com] before making a change.

## Credits
All artist information and bio was compiled from various sources. Objects and images belong to the artist, and not to me.

## Contact
If there is any issue with this app please email [ritz.wu@outlook.com].

## License
This project is licensed under the MIT License - © [Ritz Wu](http://www.ritsu.net/)
