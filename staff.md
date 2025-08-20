---
layout: page
title: Staff
nav_order: 7
description: A listing of all the course staff members.
---

# Staff

## Course Staff Email

{: .important }
> Contact course staff **via Ed** with any questions or concerns. For sensitive matters, the staff email address [data100.instructors@berkeley.edu](mailto:data100.instructors@berkeley.edu) is monitored by the instructors and a few lead TAs.


## Instructor

{% assign instructors = site.staffers | where: 'role', 'Instructor' %}
{% for staffer in instructors %}
{{ staffer }}
{% endfor %}

## UCS2s, GSIs

{% assign head_ta = site.staffers | where: 'role', 'Head TA' %}
{% for staffer in head_ta %}
  {{ staffer }}
{% endfor %}

{% assign gsi = site.staffers | where: 'role', 'GSI' %}
{% for staffer in gsi %}
  {{ staffer }}
{% endfor %}

{% assign ucs2 = site.staffers | where: 'role', 'UCS2' %}
{% for staffer in ucs2 %}
  {{ staffer }}
{% endfor %}

# UCS1s

{% assign ucs1 = site.staffers | where: 'role', 'UCS1' %}
{% for staffer in ucs1 %}
  {{ staffer }}
{% endfor %}
