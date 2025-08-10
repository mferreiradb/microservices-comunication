import ICourseRepository from '../../../application/repositories/CourseRepository';
import Course from '../../../domain/Course';
import pgp from 'pg-promise';

export default class CourseRepositoryDatabase implements ICourseRepository {
  async getById(id: string): Promise<Course> {
    const connection = pgp()('postgres://root:password@localhost:5432/mferreira');
    const [course] = await connection.query('select * from courses where course_id = $1', [
      id
    ]);
    
    await connection.$pool.end();

    return new Course(course.course_id, course.title, parseFloat(course.amount));
  }
}