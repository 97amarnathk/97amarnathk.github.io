---
layout: post
title:  "Google Summer of Code 2019 with CERN-HSF"
---

# Google Summer of Code 2019 with CERN-HSF : DIRACGrid

## Introduction
This summer, I participated as a student developer in the Google Summer of Code Program. In this program, university students contribute towards an open source project between May and July, under the guidance of the project mentors. I was selected with [CERN-HSF](https://hepsoftwarefoundation.org/activities/gsoc.html) as my mentoring organisation.

CERN-HSF is an umbrella organization for CERN, some international labs and universities for development of software pertaining to particle physics and computation/analysis of data related to it. There are a plethora of open source projects in CERN-HSF.

My work during this summer was on [DIRAC](http://diracgrid.org/) which is a software framework for distributed computing. DIRAC builds a layer between the users and the computing grids, offering a common interface to a number of heterogeneous providers, integrating them in a seamless manner, providing interoperability, at the same time an optimized, transparent and reliable usage of the resources.

> **TLDR** : If you or your organization owns millions of computer servers/grids, which are located across the globe, DIRAC would help you in distributing resources, monitoring your jobs across these.

## Project overview and proposal
My work was focussed on the _ResourceStatusSystem_(RSS) of DIRAC. This subsystem is responsible for maintaining the status of each computing resource (think storage, compute units, memory etc.). The aim of my project as a whole was to revamp the RSS to be more robust. This would involve the following:

* Unifying the RSS Backend into SQLAlchemy by providing a common base database connection module
* Porting certain modules from SQLite to SQLAlchemy + MySQL
* Writing performance tests.
* Moving RSS from Python 2.7 to Python 3

## Mentors and Peers
A big thanks to my mentors and fellow GSoC students who helped me solve countless doubts no matter how silly they were :smile:

* [Federico Stagni](https://github.com/fstagni) : Mentor
* [Zoltan Mathe](https://github.com/zmathe) : Mentor
* [Christophe Haen](https://github.com/chaen) : Mentor
* [Pujan Mehta](https://github.com/pujanm) : GSoC Student

## My Contributions

### Providing a base SQLAlchemy Module

### Modifying EmailAction to use SQLAlchemy instead of SQLite

### Writing performance tests for the RSS

### Moving RSS to Python 3

## Future Plans

## The things I learned

## The mistakes I made

## A List of Pull Requests
* [#4121](https://github.com/DIRACGrid/DIRAC/pull/4121) Adds a base sqlalchemy module, EmailAction now uses MySQL
* [#4158](https://github.com/DIRACGrid/DIRAC/pull/4158) Adds SlackAction and MattermostAction, removes SMSAction
* [#4235](https://github.com/DIRACGrid/DIRAC/pull/4235) Removes `locals_()` way of passing parameters
* [#4221](https://github.com/DIRACGrid/DIRAC/pull/4221) Performance tests using Locust and taurus
