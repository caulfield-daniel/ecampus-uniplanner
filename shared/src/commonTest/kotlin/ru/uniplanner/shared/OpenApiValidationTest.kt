package ru.uniplanner.shared

import kotlin.test.Test
import kotlin.test.assertTrue
import kotlin.test.assertFalse
import kotlin.test.assertEquals

class OpenApiValidationTest {
    
    @Test
    fun testInstituteModel() {
        val institute = Institute(
            id = 1,
            shortName = "CS",
            name = "Computer Science Institute",
            branchId = 1
        )
        
        val validationResult = ModelValidators.validateInstitute(institute)
        assertTrue(validationResult.isValid, "Institute model should be valid according to OpenAPI spec")
    }
    
    @Test
    fun testSpecialtyModel() {
        val specialty = Specialty(
            id = 1,
            name = "Software Engineering",
            instituteId = 1
        )
        
        val validationResult = ModelValidators.validateSpecialty(specialty)
        assertTrue(validationResult.isValid, "Specialty model should be valid according to OpenAPI spec")
    }
    
    @Test
    fun testAcademicGroupModel() {
        val academicGroup = AcademicGroup(
            id = 1,
            name = "IT-201",
            eduLevel = "Bachelor",
            specialtyId = 1
        )
        
        val validationResult = ModelValidators.validateAcademicGroup(academicGroup)
        assertTrue(validationResult.isValid, "AcademicGroup model should be valid according to OpenAPI spec")
    }
    
    @Test
    fun testTeacherModel() {
        val teacher = Teacher(
            id = 1,
            name = "John Doe"
        )
        
        val validationResult = ModelValidators.validateTeacher(teacher)
        assertTrue(validationResult.isValid, "Teacher model should be valid according to OpenAPI spec")
    }
    
    @Test
    fun testRoomModel() {
        val room = Room(
            id = 1,
            name = "A-101"
        )
        
        val validationResult = ModelValidators.validateRoom(room)
        assertTrue(validationResult.isValid, "Room model should be valid according to OpenAPI spec")
    }
    
    @Test
    fun testParserStatusResponseModel() {
        val response = ParserStatusResponse(
            status = "running",
            lastUpdate = "2023-01-01T10:00:00Z",
            groupsCount = 10,
            lessonsCount = 100
        )
        
        val validationResult = ModelValidators.validateParserStatusResponse(response)
        assertTrue(validationResult.isValid, "ParserStatusResponse model should be valid according to OpenAPI spec")
    }
    
    @Test
    fun testParserSyncRequestModel() {
        val request = ParserSyncRequest(
            startDate = "2023-01-01",
            endDate = "2023-01-31",
            groups = listOf("IT-201", "IT-202")
        )
        
        val validationResult = ModelValidators.validateParserSyncRequest(request)
        assertTrue(validationResult.isValid, "ParserSyncRequest model should be valid according to OpenAPI spec")
    }
    
    @Test
    fun testInvalidModels() {
        // Test invalid institute with empty shortName
        val invalidInstitute = Institute(
            id = 1,
            shortName = "",
            name = "Computer Science Institute",
            branchId = 1
        )
        
        val validationResult = ModelValidators.validateInstitute(invalidInstitute)
        assertFalse(validationResult.isValid, "Institute with empty shortName should be invalid")
        
        // Test invalid specialty with too long name
        val invalidSpecialty = Specialty(
            id = 1,
            name = "a".repeat(101), // More than 100 characters
            instituteId = 1
        )
        
        val specialityValidationResult = ModelValidators.validateSpecialty(invalidSpecialty)
        assertFalse(specialityValidationResult.isValid, "Specialty with name longer than 100 chars should be invalid")
    }
}