# frozen_string_literal: true

require 'date'

# TODO: We should be able to define a class that returns a
# A class so these all share code.
module Jekyll
  # Add discussion classes to a resource on the website calendar.
  class DiscussionTag < Liquid::Tag
    def initialize(tag_name, number, tokens)
      super
      @number = number.strip
    end

    def render(_context)
      "**Discussion #{@number}**{: .label .label-disc }"
    end
  end

  # Used to render when a homework assignment is first released
  class HomeworkReleaseTag < Liquid::Tag
    def initialize(tag_name, number, tokens)
      super
      @number = number.strip
    end

    def render(_context)
      "**Homework #{@number}**{: .label .label-hw-rel }"
    end
  end

  # Add tags for a lecture, and link to the appropriate page.
  class LectureTag < Liquid::Tag
    def initialize(tag_name, number, tokens)
      super
      @number = number.strip
    end

    def render(context)
      lectures = context['site']['lectures']
      lecture = lectures[@number.to_i - 1] if lectures[@number.to_i - 1]
      lecture_title = lecture['title']
      # add leading 0 to number if less than 10
      num_index = @number.to_i < 10 ? "0#{@number}" : @number
      # Check if hyperlinked field is true, if not return plain text
      return "**Lecture #{@number}**{: .label .label-lecture } #{lecture_title}" unless lecture['hyperlinked']

      "**Lecture #{@number}**{: .label .label-lecture } [#{lecture_title}](lectures/#{num_index})"
    end
  end

  # Used for when a project is released (outline style label)
  class ProjectReleaseTag < Liquid::Tag
    def initialize(tag_name, number, tokens)
      super
      @number = number.strip
    end

    def text
      return "Project #{@number}" if @number.to_i.to_s == @number

      "#{@number} Project"
    end

    def render(_context)
      "**#{text}**{: .label .label-proj-rel }"
    end
  end

  # Used on the calendar when the homework is due (solid-style label)
  class HomeworkDueTag < Liquid::Tag
    def initialize(tag_name, number, tokens)
      super
      @number = number.strip
    end

    def render(_context)
      "**Homework #{@number}**{: .label .label-hw-due }"
    end
  end

  # Used for the due date entry for a project (solid-style label)
  class ProjectDueTag < Liquid::Tag
    def initialize(tag_name, number, tokens)
      super
      @number = number.strip
    end

    def text
      return "Project #{@number}" if @number.to_i.to_s == @number

      "#{@number} Project"
    end

    def render(_context)
      "**#{text}**{: .label .label-proj-due }"
    end
  end
end

Liquid::Template.register_tag('disc', Jekyll::DiscussionTag)
Liquid::Template.register_tag('hw_rel', Jekyll::HomeworkReleaseTag)
Liquid::Template.register_tag('hw_due', Jekyll::HomeworkDueTag)
Liquid::Template.register_tag('lec', Jekyll::LectureTag)
Liquid::Template.register_tag('proj_rel', Jekyll::ProjectReleaseTag)
Liquid::Template.register_tag('proj_due', Jekyll::ProjectDueTag)
