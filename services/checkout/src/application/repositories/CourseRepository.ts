import Course from '../../domain/Course';

interface ICourseRepository {
    getById(id: string): Promise<Course>
}

export default ICourseRepository;