## preceptors

- id

## teachers

- id

## parents

- id

## students

- id
- full_name
- course_id
- absences
- attendance_id
- average

## courses

- id
- name
- division

## role

- id
- role_name ENUM("teacher" or "preceptor")

## course_role

- course_id
- rol_id

## subjects

- id
- name

## course_role_subject

- id
- curso_id
- rol_id
- materia_id

# attendance

- id
- student_id
- date
- state ENUM("present", "absent", "delay", "justified")
- attendance_controls_id

## attendance_controls

- id
- withdrawals_controls_id
- tardiness

## withdrawals_controls

- id
- withdrawals
- date
- entry_time
- departure_time

## evaluation_items

- id
- name
- student_id

## evaluation_marks

- id
- evaluation_item_id
- mark
