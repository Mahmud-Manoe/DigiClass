const v1 = require("express").Router();
const uploadImage = require("../../utils/image");
const upload = require("../../utils/multer");
const uploadOnMemory = require("../../utils//uploadOnMemory");

const ApplicationController = require("../../controller/api/v1/application.controller");

const AccumulatedScoresController = require("../../controller/api/v1/accumulated_scores.controller");
const AssignmentsAnswerController = require("../../controller/api/v1/assignments_answer.controller");
const AssignmentsController = require("../../controller/api/v1/assignments.controller");
const ClassesController = require("../../controller/api/v1/classes.controller");
const ExamAnswersController = require("../../controller/api/v1/exam_answers.controller");
const ExamQuestionsController = require("../../controller/api/v1/exam_questions.controller");
const ExamsController = require("../../controller/api/v1/exam.controller");
const FilesController = require("../../controller/api/v1/files.controller");
const MaterialsController = require("../../controller/api/v1/materials.controller");
const InvitationsController = require("../../controller/api/v1/invitations.controller");
const QuestionsBankController = require("../../controller/api/v1/questions_bank.controller");
const UserInvitationsController = require("../../controller/api/v1/user_invitations.controller.js");
const UsersController = require("../../controller/api/v1/users.controller");

const AbsensController = require("../../controller/api/v1/absen.controller");
const AnnouncementController = require("../../controller/api/v1/announcement.controller");
const NotificationController = require("../../controller/api/v1/notification.controller");
const AttendanceRecordsController = require("../../controller/api/v1/attendance_records.controller");
const AttendanceSessionsController = require("../../controller/api/v1/attendance_session.controller");


const Authentication = require("../../middleware/midleware.js");

//root
v1.get("/favico", (req, res) => res.status(204).send(""));
v1.get("/", ApplicationController.handleGetRoot);

// accumulated_score
v1.get("/accumulated_score", AccumulatedScoresController.getAccumulatedScores);
v1.get("/accumulated_score/class/:id", AccumulatedScoresController.getAccumulatedScoresByClass);

v1.get("/score_user/:classId", AccumulatedScoresController.getScoreByClassId);
v1.get("/score_user/:userId/class/:classId", AccumulatedScoresController.getScoreStudentByClassId);
// v1.post("/accumulated_score", AccumulatedScoresController.createAccumulatedScores);
// v1.put("/accumulated_score/:id", AccumulatedScoresController.updateAccumulatedScoresById); 
// v1.delete("/accumulated_score/:id", AccumulatedScoresController.deleteAccumulatedScores); 

// // assignments_answer
// v1.get("/assignments_answers", AssignmentsAnswerController.getAssignmentsAnswer);
v1.get("/assignment_answer/:id", AssignmentsAnswerController.getAssignmentsAnswerById);
v1.get("/assignment_answer", [Authentication.requiredToken, Authentication.isStudent], AssignmentsAnswerController.getAssignmentsAnswer);
v1.get("/assignment_answer/asssigment/:id", AssignmentsAnswerController.getAssignmentsAnswerByAssignmentId);
v1.post("/assignment_answer",[Authentication.requiredToken, Authentication.isStudent], AssignmentsAnswerController.createAssignmentsAnswer);
v1.put("/assignment_answer/:id", AssignmentsAnswerController.updateAssignmentsAnswerById); // guru sekalian update detail
// v1.delete("/assignments_answer/:id", AssignmentsAnswerController.deleteAssignmentsAnswer); 

// // assignments
v1.get("/assignments", AssignmentsController.getAssignments);
v1.get("/assignment/:id", AssignmentsController.getAssignmentsById);
v1.get("/assignment/class/:id", AssignmentsController.getAssignmentsByClassId);
v1.post("/assignment", AssignmentsController.createAssignments);
v1.put("/assignment/:id", AssignmentsController.updateAssignmentsById); 
v1.delete("/assignment/:id", AssignmentsController.deleteAssignments); 
 
// classes 
v1.get("/classes", ClassesController.getClasses); //a
v1.get("/teachers/classes",[Authentication.requiredToken, Authentication.isTeacher], ClassesController.getClassesByTeacherId);
v1.get("/students/classes", [Authentication.requiredToken, Authentication.isStudent], ClassesController.getClassesByStudentId);
v1.get("/class/:id", ClassesController.getClassesById); //a
v1.post("/class", [Authentication.requiredToken, Authentication.isTeacher], ClassesController.createClasses); //guru seklian create akumulasi skor
v1.put("/class/:id", ClassesController.updateClassesById); //guru
v1.delete("/class/:id", ClassesController.deleteClasses);  //guru

// exam_answers
v1.get("/exam_answers", ExamAnswersController.getExamAnswers);
v1.get("/exam_answer/:id", ExamAnswersController.getExamAnswersById);
v1.get("/exam_answers/student", ExamAnswersController.getExamAnswersStudent);
v1.get("/exam_answer/:examId/user/:id", ExamAnswersController.getExamScoresWithDetails); //guru
v1.get("/exam_answers/question/:id",  [Authentication.requiredToken, Authentication.isStudent], ExamAnswersController.getExamAnswersByQuestionId);
v1.post("/exam_answer",  [Authentication.requiredToken, Authentication.isStudent], ExamAnswersController.creteExamAnswers); //siswa
v1.put("/exam_answer/:id", ExamAnswersController.updateExamAnswersById);
v1.put("/exam_answer/score/:id", ExamAnswersController.updateScoreExamAnswersById);
v1.put("/answer_score/:id", ExamAnswersController.updateScoreStudent);  // guru update score sekalian buat detail score
// v1.delete("/exam_answer/:id", ExamAnswersController.deleteExamAnswers); 

// exam_questions ✅
v1.get("/exam_questions", ExamQuestionsController.getExamQuestions);
v1.get("/exam_question/:id", ExamQuestionsController.getExamQuestionsById);
v1.get("/exam_question/exam/:id", ExamQuestionsController.getExamQuestionsByExamId); //guru
v1.get("/exam_question/exam_student/:id", ExamQuestionsController.getExamQuestionsStudentByExamId); //siswa
v1.post("/exam_question", ExamQuestionsController.createExamQuestions);
v1.put("/exam_question/:id", ExamQuestionsController.updateExamQuestionsById); 
v1.delete("/exam_question/:id", ExamQuestionsController.deleteExamQuestions); 

// exam ✅
v1.get("/exams", ExamsController.getExams);
v1.get("/exam/:id", ExamsController.getExamsById);
v1.get("/exam/class/:id", ExamsController.getExamsByClassId);
v1.post("/exam", ExamsController.createExams); //guru
v1.put("/exam/:id", ExamsController.updateExamsById); 
v1.delete("/exam/:id", ExamsController.deleteExams); 

v1.post("/exam/:examId/grade", ExamsController.gradeExamAnswers); //guru

//files
// v1.get("/files", FilesController.getFiless);
v1.get("/file/:id", FilesController.getFilesById);
// v1.post("/file", upload.single("files"), FilesController.createFiles); 
v1.put("/file/:id", FilesController.updateFilesById); 
// v1.delete("/file/:id", FilesController.deletefiles); 

// invitations ✅
v1.get("/invitations", InvitationsController.getInvitations);
v1.get("/invitation/:id", InvitationsController.getInvitationsById);
// v1.post("/invitation", InvitationsController.createInvitations); di buat jika kelas di buat
// v1.put("/invitation/:id", InvitationsController.updateInvitationsById); tidak dapat di edit
// v1.delete("/invitation/:id", InvitationsController.deleteInvitations); di hapus jika kelas di hapus

// material ✅
v1.get("/materials", MaterialsController.getMaterials);
v1.get("/material/:id", MaterialsController.getMaterialById);
v1.get("/materials/class/:id", MaterialsController.getMaterialByclassId);
v1.post("/material", MaterialsController.createMaterial);
v1.put("/material/:id", MaterialsController.updateMaterialById);
v1.delete("/material/:id", MaterialsController.deleteMaterial);

// // questions_bank ✅
v1.get("/questions_banks", QuestionsBankController.getQuestionsBank);
v1.get("/questions_bank/:id", QuestionsBankController.getQuestionsBankById);
// v1.post("/questions_bank", QuestionsBankController.createQuestionsBank); //di buat saat tabel soal di buat
// v1.put("/questions_bank/:id", QuestionsBankController.updateQuestionsBankById); dibuat saat tabel soal di buat
// v1.delete("/questions_bank/:id", QuestionsBankController.deleteQuestionsBank);  di hapus saat tabel soal di hapus

// user_invitation ✅
v1.get("/user_invitations", UserInvitationsController.getUserInvitations);
v1.get("/user_invitation/:id", UserInvitationsController.getUserInvitationsById);
v1.get("/students/:classId", UserInvitationsController.getStudent);
v1.post("/join_class", [Authentication.requiredToken, Authentication.isStudent], UserInvitationsController.joinClass); //siswa join seklian buat as
v1.delete("/leave_class/:classId",  [Authentication.requiredToken, Authentication.isStudent], UserInvitationsController.deleteUserInvitations); // juga hapus as
v1.delete("/kick_student/:userId",  UserInvitationsController.kickStudent); //hapus as
 
//new feature
//absen
v1.get("/absens", AbsensController.getAbsen);
v1.get("/absen/:id", AbsensController.getAbsenById);
v1.post("/absen", AbsensController.createAbsen); 
v1.put("/absen/:id", AbsensController.updateAbsenById); 
v1.delete("/absen/:id", AbsensController.deleteAbsen);  

//attendance_session
v1.get("/attendance_sessions", AttendanceSessionsController.getAttendanceSessions);
v1.get("/attendance_session/:id", AttendanceSessionsController.getAttendanceSessionsById);
v1.get("/attendance_session/class/:classId/type/:type", AttendanceSessionsController.getAttendanceSessionsByClassId);
v1.post("/attendance_session", AttendanceSessionsController.createAttendanceSessions); //2
v1.put("/attendance_session/:id", AttendanceSessionsController.updateAttendanceSessionsById); 
v1.delete("/attendance_session/:id", AttendanceSessionsController.deleteAttendanceSessions);  

//attendance_record
v1.get("/attendance_records", AttendanceRecordsController.getAttendanceRecords);
v1.get("/attendance_record/:id", AttendanceRecordsController.getAttendanceRecordsById);
v1.get("/attendance_record/class/:id", AttendanceRecordsController.getAttendanceRecordsByClassId);
v1.post("/attendance_record", AttendanceRecordsController.createAttendanceRecords);  //1
v1.put("/attendance_record/:id", AttendanceRecordsController.updateAttendanceRecordsById); 
v1.delete("/attendance_record/:id", AttendanceRecordsController.deleteAttendanceRecords);  

//announcement
v1.get("/announcements", AnnouncementController.getAnnouncement);
v1.get("/announcement/:id", AnnouncementController.getAnnouncementById);
v1.get("/announcement/class/:id", AnnouncementController.getAnnouncementByClassId);
v1.post("/announcement", [Authentication.requiredToken], AnnouncementController.createAnnouncement); 
v1.put("/announcement/:id", AnnouncementController.updateAnnouncementById); 
v1.delete("/announcement/:id", AnnouncementController.deleteAnnouncement);  

//notification
v1.get("/notifications", NotificationController.getNotification);
v1.get("/notification/:id", NotificationController.getNotificationById);
v1.get("/notification/class/:id", NotificationController.getNotificationByClassId);
v1.post("/notification", NotificationController.createNotification); 
v1.put("/notification/:id", NotificationController.updateNotificationById); 
v1.delete("/notification/:id", NotificationController.deleteNotification);  

// USER
v1.post("/login", UsersController.loginUser);
v1.post("/register", UsersController.registerUser);
v1.get("/profile", [Authentication.requiredToken], UsersController.profile);
v1.get("/user/:id", [Authentication.requiredToken], UsersController.getUserById);
v1.get("/users", [Authentication.requiredToken], UsersController.getUsers);
// v1.get("/logout", [Authentication.requiredToken], UsersController.logoutUser);

module.exports = v1;
