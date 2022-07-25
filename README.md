# API

## Setup

1. Pull the code
2. Run `yarn install`
3. Duplicate `.env.sample` inside `app/` directory and name it as `.env`
4. Change some of the most basic configurations, as mentioned below

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=
PORT=8000
```

5. Run `yarn dev`
6. Open `http://localhost:8000/graphql` in the browser
7. Type the following

```
{
   info
}
```

8. If you get the output as

```
{
  "data": {
    "info": "DB Connection is live."
  }
}
```

your project has been setup successfully and you're good to go.

9. If you get any error, there are some mistakes in configuring `.env`.

## Migrations

1. To create a new migration file, run `yarn db:new <migration_file_name>`
   and your migration file will be created on project root directory.
   Move that file to migrations/ directory of corresponding package.
2. Define your schema in the generated migration file
3. To run your migration, run `yarn db:migrate` in project root directory
4. During project setup, it is enough to run `yarn db:migrate`

## Setup Stripe CLI

1. Install [Stripe CLI](https://stripe.com/docs/stripe-cli#install) for your environment
2. Login to Stripe account for that project using `stripe login` command
3. Listen to Stripe events with the following command. Eg. This command will listen to only stripe payment succeeded trigger `stripe listen --events payment_intent.succeeded --forward-to localhost:8000/webhook`

## Dev Notes

Import hoa_dev.sql file from cloud.gogosoon.com for Dummy data
