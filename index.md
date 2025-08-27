---
layout: page
title: Home / Schedule
nav_order: 1
description: A week-to-week description of the content covered in the course.
currWeekNumber: 1
---

# Data 100: Principles and Techniques of Data Science

## UC Berkeley, Fall 2025 
{: .mb-2 .fs-6 .text-grey-dk-000 style="margin-top: 0;"  }
[Ed](https://edstem.org/us/courses/83980){:target="\_blank" .btn .btn-ed .mr-1 }
[Datahub](http://data100.datahub.berkeley.edu/){:target="\_blank" .btn .btn-datahub .mr-1 }
[Pensieve](){:target="\_blank" .btn .btn-gradescope .mr-1 }
<!-- [Lectures Playlist](){:target="\_blank" .btn .btn-youtube .mr-1} -->
[Additional Accommodations](https://docs.google.com/forms/d/e/1FAIpQLSeLQXhbxlbenjEkhbonBrd6XFiKoPXgq2B7VBvKwYbW9a49dA/viewform?usp=header){:target="\_blank" .btn .btn-blue .mr-1 }
[Office Hours Queue](https://oh.ds100.org/){:target="\_blank" .btn .btn-oh .mr-1}

<div>
{% assign instructors = site.staffers | where: 'role', 'Instructor' | sort: 'order' %}
  <div class="role">
    {% for staffer in instructors %}
    <!-- {% assign staffer.photo = staffer.photo | replace: '../', '' %} -->
    {{ staffer }}
    {% endfor %}
  </div>
</div>

{: .highlight }
> Welcome to [Week {{page.currWeekNumber}}](#week-{{page.currWeekNumber}}) of Data 100!
> 
> Lectures will be webcast on [Zoom](){:target="\_blank"}.



<a name="schedule"></a>


## Schedule

{% for module in site.modules %}
{{ module }}
{% endfor %}