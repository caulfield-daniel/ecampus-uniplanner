type Nullable<T> = T | null | undefined
declare function KtSingleton<T>(): T & (abstract new() => any);
export declare namespace kotlin.collections {
    interface KtList<E> /* extends kotlin.collections.Collection<E> */ {
        asJsReadonlyArrayView(): ReadonlyArray<E>;
        readonly __doNotUseOrImplementIt: {
            readonly "kotlin.collections.KtList": unique symbol;
        };
    }
    namespace KtList {
        function fromJsArray<E>(array: ReadonlyArray<E>): kotlin.collections.KtList<E>;
    }
}
export declare namespace ru.uniplanner.shared {
    abstract class ApiConstants extends KtSingleton<ApiConstants.$metadata$.constructor>() {
        private constructor();
    }
    namespace ApiConstants {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            abstract class constructor {
                get BASE_URL(): string;
                get ENDPOINT_AUTH_REGISTER(): string;
                get ENDPOINT_AUTH_LOGIN(): string;
                get ENDPOINT_AUTH_ME(): string;
                get ENDPOINT_TASKS(): string;
                get ENDPOINT_NOTES(): string;
                get ENDPOINT_SCHEDULE(): string;
                get ENDPOINT_GROUPS(): string;
                get ENDPOINT_PARSER_STATUS(): string;
                get ENDPOINT_PARSER_SYNC(): string;
                get ENDPOINT_PARSER_INSTITUTES(): string;
                get ENDPOINT_PARSER_SPECIALTIES(): string;
                get ENDPOINT_PARSER_GROUPS(): string;
                get HEADER_AUTHORIZATION(): string;
                get HEADER_BEARER_PREFIX(): string;
                private constructor();
            }
        }
    }
    class ApiResponse<T> {
        constructor(data?: Nullable<T>, error?: Nullable<ru.uniplanner.shared.ErrorResponse>, success?: boolean);
        get data(): Nullable<T>;
        get error(): Nullable<ru.uniplanner.shared.ErrorResponse>;
        get success(): boolean;
        copy(data?: Nullable<T>, error?: Nullable<ru.uniplanner.shared.ErrorResponse>, success?: boolean): ru.uniplanner.shared.ApiResponse<T>;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace ApiResponse {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new <T>() => ApiResponse<T>;
        }
    }
    class ScheduleParams {
        constructor(group: string, date?: Nullable<string>);
        get group(): string;
        get date(): Nullable<string>;
        copy(group?: string, date?: Nullable<string>): ru.uniplanner.shared.ScheduleParams;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace ScheduleParams {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => ScheduleParams;
        }
    }
    class TaskUpdateParams {
        constructor(title?: Nullable<string>, description?: Nullable<string>, deadline?: Nullable<string>, priority?: Nullable<number>, completed?: Nullable<boolean>);
        get title(): Nullable<string>;
        get description(): Nullable<string>;
        get deadline(): Nullable<string>;
        get priority(): Nullable<number>;
        get completed(): Nullable<boolean>;
        copy(title?: Nullable<string>, description?: Nullable<string>, deadline?: Nullable<string>, priority?: Nullable<number>, completed?: Nullable<boolean>): ru.uniplanner.shared.TaskUpdateParams;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace TaskUpdateParams {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => TaskUpdateParams;
        }
    }
    class ParserSyncParams {
        constructor(startDate?: Nullable<string>, endDate?: Nullable<string>, groups?: Nullable<kotlin.collections.KtList<string>>);
        get startDate(): Nullable<string>;
        get endDate(): Nullable<string>;
        get groups(): Nullable<kotlin.collections.KtList<string>>;
        copy(startDate?: Nullable<string>, endDate?: Nullable<string>, groups?: Nullable<kotlin.collections.KtList<string>>): ru.uniplanner.shared.ParserSyncParams;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace ParserSyncParams {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => ParserSyncParams;
        }
    }
}
export declare namespace ru.uniplanner.shared {
    class ErrorResponse {
        constructor(code: number, message: string);
        get code(): number;
        get message(): string;
        copy(code?: number, message?: string): ru.uniplanner.shared.ErrorResponse;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace ErrorResponse {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => ErrorResponse;
        }
    }
    class User {
        constructor(id: string, email: string, fullName: string, groupName: string);
        get id(): string;
        get email(): string;
        get fullName(): string;
        get groupName(): string;
        copy(id?: string, email?: string, fullName?: string, groupName?: string): ru.uniplanner.shared.User;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace User {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => User;
        }
    }
    class RegisterRequest {
        constructor(email: string, password: string, fullName: string, groupName: string);
        get email(): string;
        get password(): string;
        get fullName(): string;
        get groupName(): string;
        copy(email?: string, password?: string, fullName?: string, groupName?: string): ru.uniplanner.shared.RegisterRequest;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace RegisterRequest {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => RegisterRequest;
        }
    }
    class LoginRequest {
        constructor(email: string, password: string);
        get email(): string;
        get password(): string;
        copy(email?: string, password?: string): ru.uniplanner.shared.LoginRequest;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace LoginRequest {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => LoginRequest;
        }
    }
    class LoginResponse {
        constructor(token: string, user: ru.uniplanner.shared.User);
        get token(): string;
        get user(): ru.uniplanner.shared.User;
        copy(token?: string, user?: ru.uniplanner.shared.User): ru.uniplanner.shared.LoginResponse;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace LoginResponse {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => LoginResponse;
        }
    }
    class Task {
        constructor(id: number, title: string, description: Nullable<string> | undefined, deadline: string, priority: number, completed: boolean);
        get id(): number;
        get title(): string;
        get description(): Nullable<string>;
        get deadline(): string;
        get priority(): number;
        get completed(): boolean;
        copy(id?: number, title?: string, description?: Nullable<string>, deadline?: string, priority?: number, completed?: boolean): ru.uniplanner.shared.Task;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace Task {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => Task;
        }
    }
    class TaskInput {
        constructor(title: string, description: Nullable<string> | undefined, deadline: string, priority: number, completed?: boolean);
        get title(): string;
        get description(): Nullable<string>;
        get deadline(): string;
        get priority(): number;
        get completed(): boolean;
        copy(title?: string, description?: Nullable<string>, deadline?: string, priority?: number, completed?: boolean): ru.uniplanner.shared.TaskInput;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace TaskInput {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => TaskInput;
        }
    }
    class Note {
        constructor(id: number, title: string, content: string);
        get id(): number;
        get title(): string;
        get content(): string;
        copy(id?: number, title?: string, content?: string): ru.uniplanner.shared.Note;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace Note {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => Note;
        }
    }
    class NoteInput {
        constructor(title: string, content: string);
        get title(): string;
        get content(): string;
        copy(title?: string, content?: string): ru.uniplanner.shared.NoteInput;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace NoteInput {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => NoteInput;
        }
    }
    class Lesson {
        constructor(id: number, group: string, date: string, weekday: string, discipline: string, type: string, timeStart: string, timeEnd: string, teacher?: Nullable<string>, room?: Nullable<string>, subgroup?: Nullable<string>);
        get id(): number;
        get group(): string;
        get date(): string;
        get weekday(): string;
        get discipline(): string;
        get type(): string;
        get timeStart(): string;
        get timeEnd(): string;
        get teacher(): Nullable<string>;
        get room(): Nullable<string>;
        get subgroup(): Nullable<string>;
        copy(id?: number, group?: string, date?: string, weekday?: string, discipline?: string, type?: string, timeStart?: string, timeEnd?: string, teacher?: Nullable<string>, room?: Nullable<string>, subgroup?: Nullable<string>): ru.uniplanner.shared.Lesson;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace Lesson {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => Lesson;
        }
    }
    class GroupInfo {
        constructor(id: number, name: string, institute?: Nullable<string>, specialty?: Nullable<string>);
        get id(): number;
        get name(): string;
        get institute(): Nullable<string>;
        get specialty(): Nullable<string>;
        copy(id?: number, name?: string, institute?: Nullable<string>, specialty?: Nullable<string>): ru.uniplanner.shared.GroupInfo;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace GroupInfo {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => GroupInfo;
        }
    }
    class Institute {
        constructor(id: number, shortName: string, name: string, branchId?: number);
        get id(): number;
        get shortName(): string;
        get name(): string;
        get branchId(): number;
        copy(id?: number, shortName?: string, name?: string, branchId?: number): ru.uniplanner.shared.Institute;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace Institute {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => Institute;
        }
    }
    class Specialty {
        constructor(id: number, name: string, instituteId: number);
        get id(): number;
        get name(): string;
        get instituteId(): number;
        copy(id?: number, name?: string, instituteId?: number): ru.uniplanner.shared.Specialty;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace Specialty {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => Specialty;
        }
    }
    class AcademicGroup {
        constructor(id: number, name: string, eduLevel: string, specialtyId: number);
        get id(): number;
        get name(): string;
        get eduLevel(): string;
        get specialtyId(): number;
        copy(id?: number, name?: string, eduLevel?: string, specialtyId?: number): ru.uniplanner.shared.AcademicGroup;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace AcademicGroup {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => AcademicGroup;
        }
    }
    class Teacher {
        constructor(id: number, name?: string);
        get id(): number;
        get name(): string;
        copy(id?: number, name?: string): ru.uniplanner.shared.Teacher;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace Teacher {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => Teacher;
        }
    }
    class Room {
        constructor(id: number, name: string);
        get id(): number;
        get name(): string;
        copy(id?: number, name?: string): ru.uniplanner.shared.Room;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace Room {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => Room;
        }
    }
    class ParserStatusResponse {
        constructor(status: string, lastUpdate: Nullable<string>, groupsCount: number, lessonsCount: number);
        get status(): string;
        get lastUpdate(): Nullable<string>;
        get groupsCount(): number;
        get lessonsCount(): number;
        copy(status?: string, lastUpdate?: Nullable<string>, groupsCount?: number, lessonsCount?: number): ru.uniplanner.shared.ParserStatusResponse;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace ParserStatusResponse {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => ParserStatusResponse;
        }
    }
    class ParserSyncRequest {
        constructor(startDate: Nullable<string>, endDate: Nullable<string>, groups?: Nullable<kotlin.collections.KtList<string>>);
        get startDate(): Nullable<string>;
        get endDate(): Nullable<string>;
        get groups(): Nullable<kotlin.collections.KtList<string>>;
        copy(startDate?: Nullable<string>, endDate?: Nullable<string>, groups?: Nullable<kotlin.collections.KtList<string>>): ru.uniplanner.shared.ParserSyncRequest;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace ParserSyncRequest {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => ParserSyncRequest;
        }
    }
}
export declare namespace ru.uniplanner.shared {
    abstract class ModelValidators extends KtSingleton<ModelValidators.$metadata$.constructor>() {
        private constructor();
    }
    namespace ModelValidators {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            abstract class constructor {
                validateUser(user: ru.uniplanner.shared.User): ru.uniplanner.shared.ValidationResult;
                validateRegisterRequest(request: ru.uniplanner.shared.RegisterRequest): ru.uniplanner.shared.ValidationResult;
                validateLoginRequest(request: ru.uniplanner.shared.LoginRequest): ru.uniplanner.shared.ValidationResult;
                validateTask(task: ru.uniplanner.shared.Task): ru.uniplanner.shared.ValidationResult;
                validateTaskInput(input: ru.uniplanner.shared.TaskInput): ru.uniplanner.shared.ValidationResult;
                validateNote(note: ru.uniplanner.shared.Note): ru.uniplanner.shared.ValidationResult;
                validateNoteInput(input: ru.uniplanner.shared.NoteInput): ru.uniplanner.shared.ValidationResult;
                validateLesson(lesson: ru.uniplanner.shared.Lesson): ru.uniplanner.shared.ValidationResult;
                validateInstitute(institute: ru.uniplanner.shared.Institute): ru.uniplanner.shared.ValidationResult;
                validateSpecialty(specialty: ru.uniplanner.shared.Specialty): ru.uniplanner.shared.ValidationResult;
                validateAcademicGroup(group: ru.uniplanner.shared.AcademicGroup): ru.uniplanner.shared.ValidationResult;
                validateTeacher(teacher: ru.uniplanner.shared.Teacher): ru.uniplanner.shared.ValidationResult;
                validateRoom(room: ru.uniplanner.shared.Room): ru.uniplanner.shared.ValidationResult;
                validateParserStatusResponse(response: ru.uniplanner.shared.ParserStatusResponse): ru.uniplanner.shared.ValidationResult;
                validateParserSyncRequest(request: ru.uniplanner.shared.ParserSyncRequest): ru.uniplanner.shared.ValidationResult;
                private constructor();
            }
        }
    }
    class ValidationResult {
        constructor(isValid: boolean, errors?: kotlin.collections.KtList<string>);
        get isValid(): boolean;
        get errors(): kotlin.collections.KtList<string>;
        copy(isValid?: boolean, errors?: kotlin.collections.KtList<string>): ru.uniplanner.shared.ValidationResult;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    namespace ValidationResult {
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace $metadata$ {
            const constructor: abstract new () => ValidationResult;
        }
        abstract class Companion extends KtSingleton<Companion.$metadata$.constructor>() {
            private constructor();
        }
        namespace Companion {
            /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
            namespace $metadata$ {
                abstract class constructor {
                    valid(): ru.uniplanner.shared.ValidationResult;
                    invalid(errors: kotlin.collections.KtList<string>): ru.uniplanner.shared.ValidationResult;
                    private constructor();
                }
            }
        }
    }
}