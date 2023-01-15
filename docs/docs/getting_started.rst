.. _getting_started:

Getting started
===============

Requirements
------------
* Docker
* Docker Compose
* Post Man (optional)
* OBS studio

.. note::
    We only have Docker installation for now. Reason is that this project build around microservice
    architecture and there are too many dependencies to install on you local machine
    and run the project. 

Installation
------------

Clone the repo 

.. code-block:: console

  git clone https://github.com/Neeraj319/streammmm
  cd streammmm/
  make build
  make up

If the project shows this error 

.. code-block:: console

    Message: Error in Prisma Client request: 

    Query engine binary for current platform "linux-musl" could not be found.
    This probably happens, because you built Prisma Client on a different platform.
    (Prisma Client looked in "/app/node_modules/@prisma/client/runtime/libquery_engine-linux-musl")

Then you should run the migrations and it should fix the issue.

.. code-block:: console

    make migrate
