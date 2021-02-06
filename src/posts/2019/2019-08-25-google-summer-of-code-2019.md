---
title: Google Summer of Code 2019
date: 2019-08-25
tags: ["Open-Source", "Programming"]
excerpt: "This summer, as a part of my Google Summer of Code project, I worked with CERN-HSF on DiracGrid"
published: true
---

This summer, I participated as a student developer in the Google Summer of Code Program. In this program, university students contribute towards an open source project between May and July, under the guidance of the project mentors. I got to work with [CERN-HSF](https://hepsoftwarefoundation.org/activities/gsoc.html) as my mentoring organisation.

CERN-HSF is an umbrella organization for [CERN](https://home.cern/), some international labs and universities for development of software pertaining to particle physics and computation/analysis of data related to it. There are a plethora of open source projects maintained by CERN-HSF.

My work during this summer was on [DIRAC](http://diracgrid.org/) which is a software framework for distributed computing. DIRAC builds a layer between the users and the computing grids, offering a common interface to a number of heterogeneous providers, integrating them in a seamless manner, providing interoperability, at the same time an optimized, transparent and reliable usage of the resources.

> **TLDR** : If you or your organization owns millions of computer servers/grids, which are located across the globe, DIRAC would help you in distributing resources, monitoring your jobs across these.

## Project overview and proposal

My work was focussed on the _ResourceStatusSystem_(RSS) of DIRAC. This subsystem is responsible for maintaining the status of each computing resource (think storage, compute units, memory etc.). The aim of my project as a whole was to revamp the RSS to be more robust. This would involve the following:

- Unifying the RSS Backend into SQLAlchemy by providing a common base database connection module
- Porting certain modules from SQLite to SQLAlchemy + MySQL
- Writing performance tests.
- Moving RSS from Python 2.7 to Python 3

## Mentors and Peers

A big thanks to my mentors and fellow GSoC students who helped me

- [Federico Stagni](https://github.com/fstagni)
- [Zoltan Mathe](https://github.com/zmathe)
- [Christophe Haen](https://github.com/chaen)
- [Pujan Mehta](https://github.com/pujanm)

## My Contributions

### Providing a base SQLAlchemy Module

The SQLAlchemy python library is an Object Relational Mapper (ORM). It provides an abstraction over the SQL database, allowing users to read/write objects to the database without explicitly writing the SQL statements. Another benefit to using SQLAlchemy is the fact that the backend is decoupled from the database, making any future database migration (say moving from MySQL to Postgres) very easy.

RSS has 2 database connector modules - ResourceStatusDB and ResourceManagementDB written in SQLAlchemy. These 2 modules share a lot of common code for several database level operations/checks. Therefore my first task was to remove this redundancy by introudcing a common SQLAlchemy base module which the ResourceStatusDB and ResourceManagementDB can extend for their specific use case. This task has been completed in [#4121](https://github.com/DIRACGrid/DIRAC/pull/4121).

{% include image.html url="/images/gsoc-design-before.png" description="Before BaseSQLAlchemy Module" shadow=false%}
{% include image.html url="/images/gsoc-design-after.png" description="After BaseSQLAlchemy Module" shadow=false%}

### Modifying EmailAction to use SQLAlchemy instead of SQLite

Before describing this task, let me first explain the following DIRAC components :

- **Agent** : An Agent is an independent process responsible for a specific task.
- **Action** : An action is a program which is triggered on some state change.

Often times, if a resource's status changes, users are to be notified of the same,
via an email, chat application or some other medium. All notifications are sent via actions (which are triggered by status changes).

Incase of an email, it is not a good idea
to send an email for every status change. Rather, its better to group the notifications and publish them only once per hour or so. This is achieved using the following mechanism:

1. Maintain a local DB table for Email notifications.
2. On an action trigger the notification is appended to the DB table.
3. An Agent is scheduled hourly and queries the DB table for Email notifications, groups them and sends an Email, followed by deleting the notifications in the DB table.

The DB table was maintained using SQLite, with queries explicitly written, whereas the rest of the DIRAC uses SQLAlchemy + MySQL. Therefore my goal was to change the EmailAction and EmailAgent to use SQLAlchemy and the ResoursceStatusDB for the notification DB table. This has been completed in [#4121](https://github.com/DIRACGrid/DIRAC/pull/4121).

### Creating notification actions for Slack and Mattermost and removing SMSAction

Once the EmailAction was successfuly modified to use ResourceStatusDB, the next task was to
provide some more ways to notify users of any resource's status change. Slack is a prominent work chat application.
Mattermost is an open source alternative to Slack. In this task I developed the mechanism to post DIRAC resource notification to Slack and Mattermost.

{% include image.html url="/images/gsoc-slack.png" description="DIRAC notifications on Slack" shadow=true%}

Both of them provide nice integrations using webhooks. Webhooks work by providing a unique URL for your chat room which can be created by the admins. Any message can be sent to the chatroom as a POST query. The following are excellent guides on using webhooks which I found useful:

- [Webhooks on Slack](https://api.slack.com/incoming-webhooks)
- [Webhooks on Mattermost](https://docs.mattermost.com/developer/webhooks-incoming.html)

This has been completed in [#4158](https://github.com/DIRACGrid/DIRAC/pull/4158).

### Writing performance tests for the RSS

I implemented performance tests for RSS in Locust, which is a scalable load testing library written in Python.
This is the first time DIRAC uses Locust, as opposed to the previously used MultiMechanize.
I chose Locust over MultiMechanize because Locust is supported in Python 3 (DIRAC is moving to Python 3).

This has been completed in [#4221](https://github.com/DIRACGrid/DIRAC/pull/4221).

### Moving RSS to Python 3

THe tranisition to Python 3 is the current goal across the entire DIRAC framework.
One of my project goals thus was to port RSS from Python 2.7 to Python 3.
Although, due to some dependency issues this was not possible in my GSoC coding period,
in my other tasks, I have taken care of writing Python 3 compatible code as far as possible, while also checking for any future issues using `pylint3k` code linting.

Currently some DIRAC contributors are working on the dependency issues and when this gets done, I plan to finally transition RSS into Python 3.

## The things I learned

- Python
- Relational databases
- System design
- Design patterns
- Performance testing

## A List of Pull Requests

- [#4121](https://github.com/DIRACGrid/DIRAC/pull/4121) Adds a base sqlalchemy module, EmailAction now uses MySQL
- [#4158](https://github.com/DIRACGrid/DIRAC/pull/4158) Adds SlackAction and MattermostAction, removes SMSAction
- [#4235](https://github.com/DIRACGrid/DIRAC/pull/4235) Removes `locals()` way of passing parameters
- [#4221](https://github.com/DIRACGrid/DIRAC/pull/4221) Performance tests using Locust and taurus **[Work in progress]**
