(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var createThis = kotlin_kotlin.$_$.f4;
  var initMetadataForObject = kotlin_kotlin.$_$.p4;
  var VOID = kotlin_kotlin.$_$.c;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var initMetadataForCompanion = kotlin_kotlin.$_$.n4;
  var THROW_CCE = kotlin_kotlin.$_$.b6;
  var UnknownFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var get_nullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var BooleanSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var initMetadataForClass = kotlin_kotlin.$_$.m4;
  var toString = kotlin_kotlin.$_$.r6;
  var hashCode = kotlin_kotlin.$_$.l4;
  var getBooleanHashCode = kotlin_kotlin.$_$.i4;
  var equals = kotlin_kotlin.$_$.h4;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var getAssociatedObjectId = kotlin_kotlin.$_$.b;
  var SerializableWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p;
  var getStringHashCode = kotlin_kotlin.$_$.k4;
  var defineProp = kotlin_kotlin.$_$.g4;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var protoOf = kotlin_kotlin.$_$.d5;
  var Regex = kotlin_kotlin.$_$.o5;
  var ArrayList = kotlin_kotlin.$_$.j2;
  var isBlank = kotlin_kotlin.$_$.p5;
  var toString_0 = kotlin_kotlin.$_$.f5;
  var IllegalArgumentException = kotlin_kotlin.$_$.v5;
  var joinToString = kotlin_kotlin.$_$.q3;
  //endregion
  //region block: pre-declaration
  class ApiConstants {
    static new_ru_uniplanner_shared_ApiConstants_3e82cy_k$($box) {
      var $this = createThis(this, $box);
      ApiConstants_instance = $this;
      $this.BASE_URL = 'http://localhost:8080/api/v1';
      $this.ENDPOINT_AUTH_REGISTER = '/auth/register';
      $this.ENDPOINT_AUTH_LOGIN = '/auth/login';
      $this.ENDPOINT_AUTH_ME = '/auth/me';
      $this.ENDPOINT_TASKS = '/tasks';
      $this.ENDPOINT_NOTES = '/notes';
      $this.ENDPOINT_SCHEDULE = '/schedule';
      $this.ENDPOINT_GROUPS = '/groups';
      $this.HEADER_AUTHORIZATION = 'Authorization';
      $this.HEADER_BEARER_PREFIX = 'Bearer ';
      return $this;
    }
    get_BASE_URL_npypbe_k$() {
      return this.BASE_URL;
    }
    get_ENDPOINT_AUTH_REGISTER_5eczwn_k$() {
      return this.ENDPOINT_AUTH_REGISTER;
    }
    get_ENDPOINT_AUTH_LOGIN_kfkgoj_k$() {
      return this.ENDPOINT_AUTH_LOGIN;
    }
    get_ENDPOINT_AUTH_ME_xiqatu_k$() {
      return this.ENDPOINT_AUTH_ME;
    }
    get_ENDPOINT_TASKS_5w0mur_k$() {
      return this.ENDPOINT_TASKS;
    }
    get_ENDPOINT_NOTES_5z2g00_k$() {
      return this.ENDPOINT_NOTES;
    }
    get_ENDPOINT_SCHEDULE_8wz7vs_k$() {
      return this.ENDPOINT_SCHEDULE;
    }
    get_ENDPOINT_GROUPS_omhjv9_k$() {
      return this.ENDPOINT_GROUPS;
    }
    get_HEADER_AUTHORIZATION_w304w_k$() {
      return this.HEADER_AUTHORIZATION;
    }
    get_HEADER_BEARER_PREFIX_p48ybd_k$() {
      return this.HEADER_BEARER_PREFIX;
    }
  }
  class Companion {
    static new_ru_uniplanner_shared_ApiResponse_Companion_kql6bh_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.ApiResponse', null, 3);
      tmp0_serialDesc.addElement_5pzumi_k$('data', true);
      tmp0_serialDesc.addElement_5pzumi_k$('error', true);
      tmp0_serialDesc.addElement_5pzumi_k$('success', true);
      $this.$cachedDescriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serializer_qelnde_k$(typeSerial0) {
      return $serializer.new_ru_uniplanner_shared_ApiResponse_$serializer_d64ngc_k$(typeSerial0);
    }
    serializer_nv39qc_k$(typeParamsSerializers) {
      return this.serializer_qelnde_k$(typeParamsSerializers[0]);
    }
    get_$cachedDescriptor_3xtnpw_k$() {
      return this.$cachedDescriptor_1;
    }
  }
  class $serializer {
    static new_ru_uniplanner_shared_ApiResponse_$serializer_eypthw_k$($box) {
      var $this = createThis(this, $box);
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.ApiResponse', $this, 3);
      tmp0_serialDesc.addElement_5pzumi_k$('data', true);
      tmp0_serialDesc.addElement_5pzumi_k$('error', true);
      tmp0_serialDesc.addElement_5pzumi_k$('success', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_4ewh73_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 0) ? true : !(value.data == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 0, this.typeSerial0__1, value.data);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.error == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, $serializer_getInstance(), value.error);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.success === (!(value.data == null) && value.error == null))) {
        tmp1_output.encodeBooleanElement_ydht7q_k$(tmp0_desc, 2, value.success);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_4ewh73_k$(encoder, value instanceof ApiResponse ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_local2 = false;
      var tmp7_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp7_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, this.typeSerial0__1, tmp4_local0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, $serializer_getInstance(), tmp5_local1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp7_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp7_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, this.typeSerial0__1, tmp4_local0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, $serializer_getInstance(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp7_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp7_input.endStructure_1xqz0n_k$(tmp0_desc);
      return ApiResponse.new_ru_uniplanner_shared_ApiResponse_vuv50x_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [get_nullable(this.typeSerial0__1), get_nullable($serializer_getInstance()), BooleanSerializer_getInstance()];
    }
    typeParametersSerializers_fr94fx_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [this.typeSerial0__1];
    }
    static new_ru_uniplanner_shared_ApiResponse_$serializer_d64ngc_k$(typeSerial0, $box) {
      var $this = this.new_ru_uniplanner_shared_ApiResponse_$serializer_eypthw_k$($box);
      $this.typeSerial0__1 = typeSerial0;
      return $this;
    }
  }
  class ApiResponse {
    constructor(data, error, success) {
      return new.target.new_ru_uniplanner_shared_ApiResponse_y5eog7_k$(data, error, success);
    }
    static new_ru_uniplanner_shared_ApiResponse_y5eog7_k$(data, error, success, $box) {
      Companion_getInstance();
      data = data === VOID ? null : data;
      error = error === VOID ? null : error;
      success = success === VOID ? !(data == null) && error == null : success;
      var $this = createThis(this, $box);
      $this.data = data;
      $this.error = error;
      $this.success = success;
      return $this;
    }
    get_data_wokkxf_k$() {
      return this.data;
    }
    get_error_iqzvfj_k$() {
      return this.error;
    }
    get_success_tm3zdy_k$() {
      return this.success;
    }
    component1_7eebsc_k$() {
      return this.data;
    }
    component2_7eebsb_k$() {
      return this.error;
    }
    component3_7eebsa_k$() {
      return this.success;
    }
    copy_rg4aq5_k$(data, error, success) {
      return ApiResponse.new_ru_uniplanner_shared_ApiResponse_y5eog7_k$(data, error, success);
    }
    copy(data, error, success, $super) {
      data = data === VOID ? this.data : data;
      error = error === VOID ? this.error : error;
      success = success === VOID ? this.success : success;
      return $super === VOID ? this.copy_rg4aq5_k$(data, error, success) : $super.copy_rg4aq5_k$.call(this, data, error, success);
    }
    toString() {
      return 'ApiResponse(data=' + toString(this.data) + ', error=' + toString(this.error) + ', success=' + this.success + ')';
    }
    hashCode() {
      var result = this.data == null ? 0 : hashCode(this.data);
      result = imul(result, 31) + (this.error == null ? 0 : this.error.hashCode()) | 0;
      result = imul(result, 31) + getBooleanHashCode(this.success) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof ApiResponse))
        return false;
      if (!equals(this.data, other.data))
        return false;
      if (!equals(this.error, other.error))
        return false;
      if (!(this.success === other.success))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_ApiResponse_vuv50x_k$(seen0, data, error, success, serializationConstructorMarker, $box) {
      Companion_getInstance();
      if (!(0 === (0 & seen0))) {
        throwMissingFieldException(seen0, 0, Companion_getInstance().$cachedDescriptor_1);
      }
      var $this = createThis(this, $box);
      if (0 === (seen0 & 1))
        $this.data = null;
      else
        $this.data = data;
      if (0 === (seen0 & 2))
        $this.error = null;
      else
        $this.error = error;
      if (0 === (seen0 & 4))
        $this.success = (!($this.data == null) && $this.error == null);
      else
        $this.success = success;
      return $this;
    }
  }
  class ScheduleParams {
    constructor(group, date) {
      return new.target.new_ru_uniplanner_shared_ScheduleParams_bubrji_k$(group, date);
    }
    static new_ru_uniplanner_shared_ScheduleParams_bubrji_k$(group, date, $box) {
      date = date === VOID ? null : date;
      var $this = createThis(this, $box);
      $this.group = group;
      $this.date = date;
      return $this;
    }
    get_group_is3eja_k$() {
      return this.group;
    }
    get_date_wokkxj_k$() {
      return this.date;
    }
    component1_7eebsc_k$() {
      return this.group;
    }
    component2_7eebsb_k$() {
      return this.date;
    }
    copy_9ze9y6_k$(group, date) {
      return ScheduleParams.new_ru_uniplanner_shared_ScheduleParams_bubrji_k$(group, date);
    }
    copy(group, date, $super) {
      group = group === VOID ? this.group : group;
      date = date === VOID ? this.date : date;
      return $super === VOID ? this.copy_9ze9y6_k$(group, date) : $super.copy_9ze9y6_k$.call(this, group, date);
    }
    toString() {
      return 'ScheduleParams(group=' + this.group + ', date=' + this.date + ')';
    }
    hashCode() {
      var result = getStringHashCode(this.group);
      result = imul(result, 31) + (this.date == null ? 0 : getStringHashCode(this.date)) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof ScheduleParams))
        return false;
      if (!(this.group === other.group))
        return false;
      if (!(this.date == other.date))
        return false;
      return true;
    }
  }
  class TaskUpdateParams {
    constructor(title, description, deadline, priority, completed) {
      return new.target.new_ru_uniplanner_shared_TaskUpdateParams_dzyyqp_k$(title, description, deadline, priority, completed);
    }
    static new_ru_uniplanner_shared_TaskUpdateParams_dzyyqp_k$(title, description, deadline, priority, completed, $box) {
      title = title === VOID ? null : title;
      description = description === VOID ? null : description;
      deadline = deadline === VOID ? null : deadline;
      priority = priority === VOID ? null : priority;
      completed = completed === VOID ? null : completed;
      var $this = createThis(this, $box);
      $this.title = title;
      $this.description = description;
      $this.deadline = deadline;
      $this.priority = priority;
      $this.completed = completed;
      return $this;
    }
    get_title_iz32un_k$() {
      return this.title;
    }
    get_description_emjre5_k$() {
      return this.description;
    }
    get_deadline_nh33rz_k$() {
      return this.deadline;
    }
    get_priority_jyafsd_k$() {
      return this.priority;
    }
    get_completed_eoqvry_k$() {
      return this.completed;
    }
    component1_7eebsc_k$() {
      return this.title;
    }
    component2_7eebsb_k$() {
      return this.description;
    }
    component3_7eebsa_k$() {
      return this.deadline;
    }
    component4_7eebs9_k$() {
      return this.priority;
    }
    component5_7eebs8_k$() {
      return this.completed;
    }
    copy_ydw2x1_k$(title, description, deadline, priority, completed) {
      return TaskUpdateParams.new_ru_uniplanner_shared_TaskUpdateParams_dzyyqp_k$(title, description, deadline, priority, completed);
    }
    copy(title, description, deadline, priority, completed, $super) {
      title = title === VOID ? this.title : title;
      description = description === VOID ? this.description : description;
      deadline = deadline === VOID ? this.deadline : deadline;
      priority = priority === VOID ? this.priority : priority;
      completed = completed === VOID ? this.completed : completed;
      return $super === VOID ? this.copy_ydw2x1_k$(title, description, deadline, priority, completed) : $super.copy_ydw2x1_k$.call(this, title, description, deadline, priority, completed);
    }
    toString() {
      return 'TaskUpdateParams(title=' + this.title + ', description=' + this.description + ', deadline=' + this.deadline + ', priority=' + this.priority + ', completed=' + this.completed + ')';
    }
    hashCode() {
      var result = this.title == null ? 0 : getStringHashCode(this.title);
      result = imul(result, 31) + (this.description == null ? 0 : getStringHashCode(this.description)) | 0;
      result = imul(result, 31) + (this.deadline == null ? 0 : getStringHashCode(this.deadline)) | 0;
      result = imul(result, 31) + (this.priority == null ? 0 : this.priority) | 0;
      result = imul(result, 31) + (this.completed == null ? 0 : getBooleanHashCode(this.completed)) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof TaskUpdateParams))
        return false;
      if (!(this.title == other.title))
        return false;
      if (!(this.description == other.description))
        return false;
      if (!(this.deadline == other.deadline))
        return false;
      if (!(this.priority == other.priority))
        return false;
      if (!(this.completed == other.completed))
        return false;
      return true;
    }
  }
  class Companion_0 {
    static new_ru_uniplanner_shared_ErrorResponse_Companion_subrut_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_0 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance();
    }
  }
  class $serializer_0 {
    static new_ru_uniplanner_shared_ErrorResponse_$serializer_mpoasy_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.ErrorResponse', $this, 2);
      tmp0_serialDesc.addElement_5pzumi_k$('code', false);
      tmp0_serialDesc.addElement_5pzumi_k$('message', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_bwjd41_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.code);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.message);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_bwjd41_k$(encoder, value instanceof ErrorResponse ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = 0;
      var tmp5_local1 = null;
      var tmp6_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp6_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp6_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp6_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp6_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp6_input.endStructure_1xqz0n_k$(tmp0_desc);
      return ErrorResponse.new_ru_uniplanner_shared_ErrorResponse_jm4dei_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [IntSerializer_getInstance(), StringSerializer_getInstance()];
    }
  }
  class ErrorResponse {
    constructor(code, message) {
      return new.target.new_ru_uniplanner_shared_ErrorResponse_2cmzsi_k$(code, message);
    }
    static new_ru_uniplanner_shared_ErrorResponse_2cmzsi_k$(code, message, $box) {
      Companion_getInstance_0();
      var $this = createThis(this, $box);
      $this.code = code;
      $this.message = message;
      return $this;
    }
    get_code_wok7xy_k$() {
      return this.code;
    }
    get_message_h23axq_k$() {
      return this.message;
    }
    component1_7eebsc_k$() {
      return this.code;
    }
    component2_7eebsb_k$() {
      return this.message;
    }
    copy_xhhsuv_k$(code, message) {
      return ErrorResponse.new_ru_uniplanner_shared_ErrorResponse_2cmzsi_k$(code, message);
    }
    copy(code, message, $super) {
      code = code === VOID ? this.code : code;
      message = message === VOID ? this.message : message;
      return $super === VOID ? this.copy_xhhsuv_k$(code, message) : $super.copy_xhhsuv_k$.call(this, code, message);
    }
    toString() {
      return 'ErrorResponse(code=' + this.code + ', message=' + this.message + ')';
    }
    hashCode() {
      var result = this.code;
      result = imul(result, 31) + getStringHashCode(this.message) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof ErrorResponse))
        return false;
      if (!(this.code === other.code))
        return false;
      if (!(this.message === other.message))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_ErrorResponse_jm4dei_k$(seen0, code, message, serializationConstructorMarker, $box) {
      Companion_getInstance_0();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.code = code;
      $this.message = message;
      return $this;
    }
  }
  class Companion_1 {
    static new_ru_uniplanner_shared_User_Companion_tndc3b_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_1 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_0();
    }
  }
  class $serializer_1 {
    static new_ru_uniplanner_shared_User_$serializer_gagiiq_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_0 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.User', $this, 4);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('email', false);
      tmp0_serialDesc.addElement_5pzumi_k$('fullName', false);
      tmp0_serialDesc.addElement_5pzumi_k$('groupName', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_upvj5d_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.email);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.fullName);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 3, value.groupName);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_upvj5d_k$(encoder, value instanceof User ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_local3 = null;
      var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp8_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
        tmp3_bitMask0 = tmp3_bitMask0 | 8;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp8_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
      return User.new_ru_uniplanner_shared_User_xudxyp_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance()];
    }
  }
  class User {
    constructor(id, email, fullName, groupName) {
      return new.target.new_ru_uniplanner_shared_User_3lhkma_k$(id, email, fullName, groupName);
    }
    static new_ru_uniplanner_shared_User_3lhkma_k$(id, email, fullName, groupName, $box) {
      Companion_getInstance_1();
      var $this = createThis(this, $box);
      $this.id = id;
      $this.email = email;
      $this.fullName = fullName;
      $this.groupName = groupName;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_email_iqwbqr_k$() {
      return this.email;
    }
    get_fullName_9skygt_k$() {
      return this.fullName;
    }
    get_groupName_g0irjz_k$() {
      return this.groupName;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.email;
    }
    component3_7eebsa_k$() {
      return this.fullName;
    }
    component4_7eebs9_k$() {
      return this.groupName;
    }
    copy_hmmiyd_k$(id, email, fullName, groupName) {
      return User.new_ru_uniplanner_shared_User_3lhkma_k$(id, email, fullName, groupName);
    }
    copy(id, email, fullName, groupName, $super) {
      id = id === VOID ? this.id : id;
      email = email === VOID ? this.email : email;
      fullName = fullName === VOID ? this.fullName : fullName;
      groupName = groupName === VOID ? this.groupName : groupName;
      return $super === VOID ? this.copy_hmmiyd_k$(id, email, fullName, groupName) : $super.copy_hmmiyd_k$.call(this, id, email, fullName, groupName);
    }
    toString() {
      return 'User(id=' + this.id + ', email=' + this.email + ', fullName=' + this.fullName + ', groupName=' + this.groupName + ')';
    }
    hashCode() {
      var result = getStringHashCode(this.id);
      result = imul(result, 31) + getStringHashCode(this.email) | 0;
      result = imul(result, 31) + getStringHashCode(this.fullName) | 0;
      result = imul(result, 31) + getStringHashCode(this.groupName) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof User))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.email === other.email))
        return false;
      if (!(this.fullName === other.fullName))
        return false;
      if (!(this.groupName === other.groupName))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_User_xudxyp_k$(seen0, id, email, fullName, groupName, serializationConstructorMarker, $box) {
      Companion_getInstance_1();
      if (!(15 === (15 & seen0))) {
        throwMissingFieldException(seen0, 15, $serializer_getInstance_0().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.email = email;
      $this.fullName = fullName;
      $this.groupName = groupName;
      return $this;
    }
  }
  class Companion_2 {
    static new_ru_uniplanner_shared_RegisterRequest_Companion_cot3s5_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_2 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_1();
    }
  }
  class $serializer_2 {
    static new_ru_uniplanner_shared_RegisterRequest_$serializer_wj2f63_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_1 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.RegisterRequest', $this, 4);
      tmp0_serialDesc.addElement_5pzumi_k$('email', false);
      tmp0_serialDesc.addElement_5pzumi_k$('password', false);
      tmp0_serialDesc.addElement_5pzumi_k$('fullName', false);
      tmp0_serialDesc.addElement_5pzumi_k$('groupName', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_89gyv2_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.email);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.password);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.fullName);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 3, value.groupName);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_89gyv2_k$(encoder, value instanceof RegisterRequest ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_local3 = null;
      var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp8_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
        tmp3_bitMask0 = tmp3_bitMask0 | 8;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp8_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
      return RegisterRequest.new_ru_uniplanner_shared_RegisterRequest_j2gq8z_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance()];
    }
  }
  class RegisterRequest {
    constructor(email, password, fullName, groupName) {
      return new.target.new_ru_uniplanner_shared_RegisterRequest_hpcozw_k$(email, password, fullName, groupName);
    }
    static new_ru_uniplanner_shared_RegisterRequest_hpcozw_k$(email, password, fullName, groupName, $box) {
      Companion_getInstance_2();
      var $this = createThis(this, $box);
      $this.email = email;
      $this.password = password;
      $this.fullName = fullName;
      $this.groupName = groupName;
      return $this;
    }
    get_email_iqwbqr_k$() {
      return this.email;
    }
    get_password_bodifw_k$() {
      return this.password;
    }
    get_fullName_9skygt_k$() {
      return this.fullName;
    }
    get_groupName_g0irjz_k$() {
      return this.groupName;
    }
    component1_7eebsc_k$() {
      return this.email;
    }
    component2_7eebsb_k$() {
      return this.password;
    }
    component3_7eebsa_k$() {
      return this.fullName;
    }
    component4_7eebs9_k$() {
      return this.groupName;
    }
    copy_hmmiyd_k$(email, password, fullName, groupName) {
      return RegisterRequest.new_ru_uniplanner_shared_RegisterRequest_hpcozw_k$(email, password, fullName, groupName);
    }
    copy(email, password, fullName, groupName, $super) {
      email = email === VOID ? this.email : email;
      password = password === VOID ? this.password : password;
      fullName = fullName === VOID ? this.fullName : fullName;
      groupName = groupName === VOID ? this.groupName : groupName;
      return $super === VOID ? this.copy_hmmiyd_k$(email, password, fullName, groupName) : $super.copy_hmmiyd_k$.call(this, email, password, fullName, groupName);
    }
    toString() {
      return 'RegisterRequest(email=' + this.email + ', password=' + this.password + ', fullName=' + this.fullName + ', groupName=' + this.groupName + ')';
    }
    hashCode() {
      var result = getStringHashCode(this.email);
      result = imul(result, 31) + getStringHashCode(this.password) | 0;
      result = imul(result, 31) + getStringHashCode(this.fullName) | 0;
      result = imul(result, 31) + getStringHashCode(this.groupName) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof RegisterRequest))
        return false;
      if (!(this.email === other.email))
        return false;
      if (!(this.password === other.password))
        return false;
      if (!(this.fullName === other.fullName))
        return false;
      if (!(this.groupName === other.groupName))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_RegisterRequest_j2gq8z_k$(seen0, email, password, fullName, groupName, serializationConstructorMarker, $box) {
      Companion_getInstance_2();
      if (!(15 === (15 & seen0))) {
        throwMissingFieldException(seen0, 15, $serializer_getInstance_1().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.email = email;
      $this.password = password;
      $this.fullName = fullName;
      $this.groupName = groupName;
      return $this;
    }
  }
  class Companion_3 {
    static new_ru_uniplanner_shared_LoginRequest_Companion_1gv41t_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_3 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_2();
    }
  }
  class $serializer_3 {
    static new_ru_uniplanner_shared_LoginRequest_$serializer_oeqmcv_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_2 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.LoginRequest', $this, 2);
      tmp0_serialDesc.addElement_5pzumi_k$('email', false);
      tmp0_serialDesc.addElement_5pzumi_k$('password', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_uknyk6_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.email);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.password);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_uknyk6_k$(encoder, value instanceof LoginRequest ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp6_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp6_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp6_input.endStructure_1xqz0n_k$(tmp0_desc);
      return LoginRequest.new_ru_uniplanner_shared_LoginRequest_5op8od_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [StringSerializer_getInstance(), StringSerializer_getInstance()];
    }
  }
  class LoginRequest {
    constructor(email, password) {
      return new.target.new_ru_uniplanner_shared_LoginRequest_oahvn0_k$(email, password);
    }
    static new_ru_uniplanner_shared_LoginRequest_oahvn0_k$(email, password, $box) {
      Companion_getInstance_3();
      var $this = createThis(this, $box);
      $this.email = email;
      $this.password = password;
      return $this;
    }
    get_email_iqwbqr_k$() {
      return this.email;
    }
    get_password_bodifw_k$() {
      return this.password;
    }
    component1_7eebsc_k$() {
      return this.email;
    }
    component2_7eebsb_k$() {
      return this.password;
    }
    copy_plwnsl_k$(email, password) {
      return LoginRequest.new_ru_uniplanner_shared_LoginRequest_oahvn0_k$(email, password);
    }
    copy(email, password, $super) {
      email = email === VOID ? this.email : email;
      password = password === VOID ? this.password : password;
      return $super === VOID ? this.copy_plwnsl_k$(email, password) : $super.copy_plwnsl_k$.call(this, email, password);
    }
    toString() {
      return 'LoginRequest(email=' + this.email + ', password=' + this.password + ')';
    }
    hashCode() {
      var result = getStringHashCode(this.email);
      result = imul(result, 31) + getStringHashCode(this.password) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof LoginRequest))
        return false;
      if (!(this.email === other.email))
        return false;
      if (!(this.password === other.password))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_LoginRequest_5op8od_k$(seen0, email, password, serializationConstructorMarker, $box) {
      Companion_getInstance_3();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_2().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.email = email;
      $this.password = password;
      return $this;
    }
  }
  class Companion_4 {
    static new_ru_uniplanner_shared_LoginResponse_Companion_uwl4dh_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_4 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_3();
    }
  }
  class $serializer_4 {
    static new_ru_uniplanner_shared_LoginResponse_$serializer_ype9d9_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_3 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.LoginResponse', $this, 2);
      tmp0_serialDesc.addElement_5pzumi_k$('token', false);
      tmp0_serialDesc.addElement_5pzumi_k$('user', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_isuleo_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.token);
      tmp1_output.encodeSerializableElement_isqxcl_k$(tmp0_desc, 1, $serializer_getInstance_0(), value.user);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_isuleo_k$(encoder, value instanceof LoginResponse ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp6_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp6_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 1, $serializer_getInstance_0(), tmp5_local1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp6_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp6_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 1, $serializer_getInstance_0(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp6_input.endStructure_1xqz0n_k$(tmp0_desc);
      return LoginResponse.new_ru_uniplanner_shared_LoginResponse_s67mb9_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [StringSerializer_getInstance(), $serializer_getInstance_0()];
    }
  }
  class LoginResponse {
    constructor(token, user) {
      return new.target.new_ru_uniplanner_shared_LoginResponse_b85j7k_k$(token, user);
    }
    static new_ru_uniplanner_shared_LoginResponse_b85j7k_k$(token, user, $box) {
      Companion_getInstance_4();
      var $this = createThis(this, $box);
      $this.token = token;
      $this.user = user;
      return $this;
    }
    get_token_iz6pxs_k$() {
      return this.token;
    }
    get_user_wovspg_k$() {
      return this.user;
    }
    component1_7eebsc_k$() {
      return this.token;
    }
    component2_7eebsb_k$() {
      return this.user;
    }
    copy_81xhz_k$(token, user) {
      return LoginResponse.new_ru_uniplanner_shared_LoginResponse_b85j7k_k$(token, user);
    }
    copy(token, user, $super) {
      token = token === VOID ? this.token : token;
      user = user === VOID ? this.user : user;
      return $super === VOID ? this.copy_81xhz_k$(token, user) : $super.copy_81xhz_k$.call(this, token, user);
    }
    toString() {
      return 'LoginResponse(token=' + this.token + ', user=' + this.user.toString() + ')';
    }
    hashCode() {
      var result = getStringHashCode(this.token);
      result = imul(result, 31) + this.user.hashCode() | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof LoginResponse))
        return false;
      if (!(this.token === other.token))
        return false;
      if (!this.user.equals(other.user))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_LoginResponse_s67mb9_k$(seen0, token, user, serializationConstructorMarker, $box) {
      Companion_getInstance_4();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_3().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.token = token;
      $this.user = user;
      return $this;
    }
  }
  class Companion_5 {
    static new_ru_uniplanner_shared_Task_Companion_fcuw3h_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_5 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_4();
    }
  }
  class $serializer_5 {
    static new_ru_uniplanner_shared_Task_$serializer_wsnrv8_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_4 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.Task', $this, 6);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('title', false);
      tmp0_serialDesc.addElement_5pzumi_k$('description', true);
      tmp0_serialDesc.addElement_5pzumi_k$('deadline', false);
      tmp0_serialDesc.addElement_5pzumi_k$('priority', false);
      tmp0_serialDesc.addElement_5pzumi_k$('completed', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_1ks0nd_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.title);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.description == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, StringSerializer_getInstance(), value.description);
      }
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 3, value.deadline);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 4, value.priority);
      tmp1_output.encodeBooleanElement_ydht7q_k$(tmp0_desc, 5, value.completed);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_1ks0nd_k$(encoder, value instanceof Task ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = 0;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_local3 = null;
      var tmp8_local4 = 0;
      var tmp9_local5 = false;
      var tmp10_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp10_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp10_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp10_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp10_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
        tmp3_bitMask0 = tmp3_bitMask0 | 8;
        tmp8_local4 = tmp10_input.decodeIntElement_941u6a_k$(tmp0_desc, 4);
        tmp3_bitMask0 = tmp3_bitMask0 | 16;
        tmp9_local5 = tmp10_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 5);
        tmp3_bitMask0 = tmp3_bitMask0 | 32;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp10_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp10_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp10_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp10_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp10_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            case 4:
              tmp8_local4 = tmp10_input.decodeIntElement_941u6a_k$(tmp0_desc, 4);
              tmp3_bitMask0 = tmp3_bitMask0 | 16;
              break;
            case 5:
              tmp9_local5 = tmp10_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 5);
              tmp3_bitMask0 = tmp3_bitMask0 | 32;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp10_input.endStructure_1xqz0n_k$(tmp0_desc);
      return Task.new_ru_uniplanner_shared_Task_f1twgx_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [IntSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), StringSerializer_getInstance(), IntSerializer_getInstance(), BooleanSerializer_getInstance()];
    }
  }
  class Task {
    constructor(id, title, description, deadline, priority, completed) {
      return new.target.new_ru_uniplanner_shared_Task_6v2o2z_k$(id, title, description, deadline, priority, completed);
    }
    static new_ru_uniplanner_shared_Task_6v2o2z_k$(id, title, description, deadline, priority, completed, $box) {
      Companion_getInstance_5();
      description = description === VOID ? null : description;
      var $this = createThis(this, $box);
      $this.id = id;
      $this.title = title;
      $this.description = description;
      $this.deadline = deadline;
      $this.priority = priority;
      $this.completed = completed;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_title_iz32un_k$() {
      return this.title;
    }
    get_description_emjre5_k$() {
      return this.description;
    }
    get_deadline_nh33rz_k$() {
      return this.deadline;
    }
    get_priority_jyafsd_k$() {
      return this.priority;
    }
    get_completed_eoqvry_k$() {
      return this.completed;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.title;
    }
    component3_7eebsa_k$() {
      return this.description;
    }
    component4_7eebs9_k$() {
      return this.deadline;
    }
    component5_7eebs8_k$() {
      return this.priority;
    }
    component6_7eebs7_k$() {
      return this.completed;
    }
    copy_gveb1z_k$(id, title, description, deadline, priority, completed) {
      return Task.new_ru_uniplanner_shared_Task_6v2o2z_k$(id, title, description, deadline, priority, completed);
    }
    copy(id, title, description, deadline, priority, completed, $super) {
      id = id === VOID ? this.id : id;
      title = title === VOID ? this.title : title;
      description = description === VOID ? this.description : description;
      deadline = deadline === VOID ? this.deadline : deadline;
      priority = priority === VOID ? this.priority : priority;
      completed = completed === VOID ? this.completed : completed;
      return $super === VOID ? this.copy_gveb1z_k$(id, title, description, deadline, priority, completed) : $super.copy_gveb1z_k$.call(this, id, title, description, deadline, priority, completed);
    }
    toString() {
      return 'Task(id=' + this.id + ', title=' + this.title + ', description=' + this.description + ', deadline=' + this.deadline + ', priority=' + this.priority + ', completed=' + this.completed + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.title) | 0;
      result = imul(result, 31) + (this.description == null ? 0 : getStringHashCode(this.description)) | 0;
      result = imul(result, 31) + getStringHashCode(this.deadline) | 0;
      result = imul(result, 31) + this.priority | 0;
      result = imul(result, 31) + getBooleanHashCode(this.completed) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof Task))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.title === other.title))
        return false;
      if (!(this.description == other.description))
        return false;
      if (!(this.deadline === other.deadline))
        return false;
      if (!(this.priority === other.priority))
        return false;
      if (!(this.completed === other.completed))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_Task_f1twgx_k$(seen0, id, title, description, deadline, priority, completed, serializationConstructorMarker, $box) {
      Companion_getInstance_5();
      if (!(59 === (59 & seen0))) {
        throwMissingFieldException(seen0, 59, $serializer_getInstance_4().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.title = title;
      if (0 === (seen0 & 4))
        $this.description = null;
      else
        $this.description = description;
      $this.deadline = deadline;
      $this.priority = priority;
      $this.completed = completed;
      return $this;
    }
  }
  class Companion_6 {
    static new_ru_uniplanner_shared_TaskInput_Companion_da6fd1_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_6 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_5();
    }
  }
  class $serializer_6 {
    static new_ru_uniplanner_shared_TaskInput_$serializer_y50ovm_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_5 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.TaskInput', $this, 5);
      tmp0_serialDesc.addElement_5pzumi_k$('title', false);
      tmp0_serialDesc.addElement_5pzumi_k$('description', true);
      tmp0_serialDesc.addElement_5pzumi_k$('deadline', false);
      tmp0_serialDesc.addElement_5pzumi_k$('priority', false);
      tmp0_serialDesc.addElement_5pzumi_k$('completed', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_86tb9h_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.title);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.description == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, StringSerializer_getInstance(), value.description);
      }
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.deadline);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 3, value.priority);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 4) ? true : !(value.completed === false)) {
        tmp1_output.encodeBooleanElement_ydht7q_k$(tmp0_desc, 4, value.completed);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_86tb9h_k$(encoder, value instanceof TaskInput ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_local3 = 0;
      var tmp8_local4 = false;
      var tmp9_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp9_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp9_input.decodeIntElement_941u6a_k$(tmp0_desc, 3);
        tmp3_bitMask0 = tmp3_bitMask0 | 8;
        tmp8_local4 = tmp9_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 4);
        tmp3_bitMask0 = tmp3_bitMask0 | 16;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp9_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp9_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp9_input.decodeIntElement_941u6a_k$(tmp0_desc, 3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            case 4:
              tmp8_local4 = tmp9_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 4);
              tmp3_bitMask0 = tmp3_bitMask0 | 16;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp9_input.endStructure_1xqz0n_k$(tmp0_desc);
      return TaskInput.new_ru_uniplanner_shared_TaskInput_627xox_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), StringSerializer_getInstance(), IntSerializer_getInstance(), BooleanSerializer_getInstance()];
    }
  }
  class TaskInput {
    constructor(title, description, deadline, priority, completed) {
      return new.target.new_ru_uniplanner_shared_TaskInput_3v5efk_k$(title, description, deadline, priority, completed);
    }
    static new_ru_uniplanner_shared_TaskInput_3v5efk_k$(title, description, deadline, priority, completed, $box) {
      Companion_getInstance_6();
      description = description === VOID ? null : description;
      completed = completed === VOID ? false : completed;
      var $this = createThis(this, $box);
      $this.title = title;
      $this.description = description;
      $this.deadline = deadline;
      $this.priority = priority;
      $this.completed = completed;
      return $this;
    }
    get_title_iz32un_k$() {
      return this.title;
    }
    get_description_emjre5_k$() {
      return this.description;
    }
    get_deadline_nh33rz_k$() {
      return this.deadline;
    }
    get_priority_jyafsd_k$() {
      return this.priority;
    }
    get_completed_eoqvry_k$() {
      return this.completed;
    }
    component1_7eebsc_k$() {
      return this.title;
    }
    component2_7eebsb_k$() {
      return this.description;
    }
    component3_7eebsa_k$() {
      return this.deadline;
    }
    component4_7eebs9_k$() {
      return this.priority;
    }
    component5_7eebs8_k$() {
      return this.completed;
    }
    copy_64z0h5_k$(title, description, deadline, priority, completed) {
      return TaskInput.new_ru_uniplanner_shared_TaskInput_3v5efk_k$(title, description, deadline, priority, completed);
    }
    copy(title, description, deadline, priority, completed, $super) {
      title = title === VOID ? this.title : title;
      description = description === VOID ? this.description : description;
      deadline = deadline === VOID ? this.deadline : deadline;
      priority = priority === VOID ? this.priority : priority;
      completed = completed === VOID ? this.completed : completed;
      return $super === VOID ? this.copy_64z0h5_k$(title, description, deadline, priority, completed) : $super.copy_64z0h5_k$.call(this, title, description, deadline, priority, completed);
    }
    toString() {
      return 'TaskInput(title=' + this.title + ', description=' + this.description + ', deadline=' + this.deadline + ', priority=' + this.priority + ', completed=' + this.completed + ')';
    }
    hashCode() {
      var result = getStringHashCode(this.title);
      result = imul(result, 31) + (this.description == null ? 0 : getStringHashCode(this.description)) | 0;
      result = imul(result, 31) + getStringHashCode(this.deadline) | 0;
      result = imul(result, 31) + this.priority | 0;
      result = imul(result, 31) + getBooleanHashCode(this.completed) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof TaskInput))
        return false;
      if (!(this.title === other.title))
        return false;
      if (!(this.description == other.description))
        return false;
      if (!(this.deadline === other.deadline))
        return false;
      if (!(this.priority === other.priority))
        return false;
      if (!(this.completed === other.completed))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_TaskInput_627xox_k$(seen0, title, description, deadline, priority, completed, serializationConstructorMarker, $box) {
      Companion_getInstance_6();
      if (!(13 === (13 & seen0))) {
        throwMissingFieldException(seen0, 13, $serializer_getInstance_5().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.title = title;
      if (0 === (seen0 & 2))
        $this.description = null;
      else
        $this.description = description;
      $this.deadline = deadline;
      $this.priority = priority;
      if (0 === (seen0 & 16))
        $this.completed = false;
      else
        $this.completed = completed;
      return $this;
    }
  }
  class Companion_7 {
    static new_ru_uniplanner_shared_Note_Companion_4mi1j_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_7 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_6();
    }
  }
  class $serializer_7 {
    static new_ru_uniplanner_shared_Note_$serializer_xvbhkd_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_6 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.Note', $this, 3);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('title', false);
      tmp0_serialDesc.addElement_5pzumi_k$('content', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_2z1c8a_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.title);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.content);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_2z1c8a_k$(encoder, value instanceof Note ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = 0;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp7_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp7_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp7_input.endStructure_1xqz0n_k$(tmp0_desc);
      return Note.new_ru_uniplanner_shared_Note_oovy6f_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance()];
    }
  }
  class Note {
    constructor(id, title, content) {
      return new.target.new_ru_uniplanner_shared_Note_yc1844_k$(id, title, content);
    }
    static new_ru_uniplanner_shared_Note_yc1844_k$(id, title, content, $box) {
      Companion_getInstance_7();
      var $this = createThis(this, $box);
      $this.id = id;
      $this.title = title;
      $this.content = content;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_title_iz32un_k$() {
      return this.title;
    }
    get_content_h02jrk_k$() {
      return this.content;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.title;
    }
    component3_7eebsa_k$() {
      return this.content;
    }
    copy_hrd73x_k$(id, title, content) {
      return Note.new_ru_uniplanner_shared_Note_yc1844_k$(id, title, content);
    }
    copy(id, title, content, $super) {
      id = id === VOID ? this.id : id;
      title = title === VOID ? this.title : title;
      content = content === VOID ? this.content : content;
      return $super === VOID ? this.copy_hrd73x_k$(id, title, content) : $super.copy_hrd73x_k$.call(this, id, title, content);
    }
    toString() {
      return 'Note(id=' + this.id + ', title=' + this.title + ', content=' + this.content + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.title) | 0;
      result = imul(result, 31) + getStringHashCode(this.content) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof Note))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.title === other.title))
        return false;
      if (!(this.content === other.content))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_Note_oovy6f_k$(seen0, id, title, content, serializationConstructorMarker, $box) {
      Companion_getInstance_7();
      if (!(7 === (7 & seen0))) {
        throwMissingFieldException(seen0, 7, $serializer_getInstance_6().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.title = title;
      $this.content = content;
      return $this;
    }
  }
  class Companion_8 {
    static new_ru_uniplanner_shared_NoteInput_Companion_da7tet_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_8 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_7();
    }
  }
  class $serializer_8 {
    static new_ru_uniplanner_shared_NoteInput_$serializer_q6n0w1_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_7 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.NoteInput', $this, 2);
      tmp0_serialDesc.addElement_5pzumi_k$('title', false);
      tmp0_serialDesc.addElement_5pzumi_k$('content', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_lmnvsi_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.title);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.content);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_lmnvsi_k$(encoder, value instanceof NoteInput ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp6_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp6_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp6_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp6_input.endStructure_1xqz0n_k$(tmp0_desc);
      return NoteInput.new_ru_uniplanner_shared_NoteInput_n1rz2t_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [StringSerializer_getInstance(), StringSerializer_getInstance()];
    }
  }
  class NoteInput {
    constructor(title, content) {
      return new.target.new_ru_uniplanner_shared_NoteInput_c8qwr0_k$(title, content);
    }
    static new_ru_uniplanner_shared_NoteInput_c8qwr0_k$(title, content, $box) {
      Companion_getInstance_8();
      var $this = createThis(this, $box);
      $this.title = title;
      $this.content = content;
      return $this;
    }
    get_title_iz32un_k$() {
      return this.title;
    }
    get_content_h02jrk_k$() {
      return this.content;
    }
    component1_7eebsc_k$() {
      return this.title;
    }
    component2_7eebsb_k$() {
      return this.content;
    }
    copy_plwnsl_k$(title, content) {
      return NoteInput.new_ru_uniplanner_shared_NoteInput_c8qwr0_k$(title, content);
    }
    copy(title, content, $super) {
      title = title === VOID ? this.title : title;
      content = content === VOID ? this.content : content;
      return $super === VOID ? this.copy_plwnsl_k$(title, content) : $super.copy_plwnsl_k$.call(this, title, content);
    }
    toString() {
      return 'NoteInput(title=' + this.title + ', content=' + this.content + ')';
    }
    hashCode() {
      var result = getStringHashCode(this.title);
      result = imul(result, 31) + getStringHashCode(this.content) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof NoteInput))
        return false;
      if (!(this.title === other.title))
        return false;
      if (!(this.content === other.content))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_NoteInput_n1rz2t_k$(seen0, title, content, serializationConstructorMarker, $box) {
      Companion_getInstance_8();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_7().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.title = title;
      $this.content = content;
      return $this;
    }
  }
  class Companion_9 {
    static new_ru_uniplanner_shared_Lesson_Companion_okg23n_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_9 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_8();
    }
  }
  class $serializer_9 {
    static new_ru_uniplanner_shared_Lesson_$serializer_8cinq3_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_8 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.Lesson', $this, 11);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('group', false);
      tmp0_serialDesc.addElement_5pzumi_k$('date', false);
      tmp0_serialDesc.addElement_5pzumi_k$('weekday', false);
      tmp0_serialDesc.addElement_5pzumi_k$('discipline', false);
      tmp0_serialDesc.addElement_5pzumi_k$('type', false);
      tmp0_serialDesc.addElement_5pzumi_k$('timeStart', false);
      tmp0_serialDesc.addElement_5pzumi_k$('timeEnd', false);
      tmp0_serialDesc.addElement_5pzumi_k$('teacher', false);
      tmp0_serialDesc.addElement_5pzumi_k$('room', false);
      tmp0_serialDesc.addElement_5pzumi_k$('subgroup', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_s2vi8s_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.group);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.date);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 3, value.weekday);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 4, value.discipline);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 5, value.type);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 6, value.timeStart);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 7, value.timeEnd);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 8, value.teacher);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 9, value.room);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 10) ? true : !(value.subgroup == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 10, StringSerializer_getInstance(), value.subgroup);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_s2vi8s_k$(encoder, value instanceof Lesson ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = 0;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_local3 = null;
      var tmp8_local4 = null;
      var tmp9_local5 = null;
      var tmp10_local6 = null;
      var tmp11_local7 = null;
      var tmp12_local8 = null;
      var tmp13_local9 = null;
      var tmp14_local10 = null;
      var tmp15_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp15_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp15_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
        tmp3_bitMask0 = tmp3_bitMask0 | 8;
        tmp8_local4 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 4);
        tmp3_bitMask0 = tmp3_bitMask0 | 16;
        tmp9_local5 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 5);
        tmp3_bitMask0 = tmp3_bitMask0 | 32;
        tmp10_local6 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 6);
        tmp3_bitMask0 = tmp3_bitMask0 | 64;
        tmp11_local7 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 7);
        tmp3_bitMask0 = tmp3_bitMask0 | 128;
        tmp12_local8 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 8);
        tmp3_bitMask0 = tmp3_bitMask0 | 256;
        tmp13_local9 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 9);
        tmp3_bitMask0 = tmp3_bitMask0 | 512;
        tmp14_local10 = tmp15_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 10, StringSerializer_getInstance(), tmp14_local10);
        tmp3_bitMask0 = tmp3_bitMask0 | 1024;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp15_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp15_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            case 4:
              tmp8_local4 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 4);
              tmp3_bitMask0 = tmp3_bitMask0 | 16;
              break;
            case 5:
              tmp9_local5 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 5);
              tmp3_bitMask0 = tmp3_bitMask0 | 32;
              break;
            case 6:
              tmp10_local6 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 6);
              tmp3_bitMask0 = tmp3_bitMask0 | 64;
              break;
            case 7:
              tmp11_local7 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 7);
              tmp3_bitMask0 = tmp3_bitMask0 | 128;
              break;
            case 8:
              tmp12_local8 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 8);
              tmp3_bitMask0 = tmp3_bitMask0 | 256;
              break;
            case 9:
              tmp13_local9 = tmp15_input.decodeStringElement_3oenpg_k$(tmp0_desc, 9);
              tmp3_bitMask0 = tmp3_bitMask0 | 512;
              break;
            case 10:
              tmp14_local10 = tmp15_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 10, StringSerializer_getInstance(), tmp14_local10);
              tmp3_bitMask0 = tmp3_bitMask0 | 1024;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp15_input.endStructure_1xqz0n_k$(tmp0_desc);
      return Lesson.new_ru_uniplanner_shared_Lesson_v736kh_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, tmp13_local9, tmp14_local10, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance())];
    }
  }
  class Lesson {
    constructor(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup) {
      return new.target.new_ru_uniplanner_shared_Lesson_b3q09k_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup);
    }
    static new_ru_uniplanner_shared_Lesson_b3q09k_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup, $box) {
      Companion_getInstance_9();
      subgroup = subgroup === VOID ? null : subgroup;
      var $this = createThis(this, $box);
      $this.id = id;
      $this.group = group;
      $this.date = date;
      $this.weekday = weekday;
      $this.discipline = discipline;
      $this.type = type;
      $this.timeStart = timeStart;
      $this.timeEnd = timeEnd;
      $this.teacher = teacher;
      $this.room = room;
      $this.subgroup = subgroup;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_group_is3eja_k$() {
      return this.group;
    }
    get_date_wokkxj_k$() {
      return this.date;
    }
    get_weekday_ljzv3z_k$() {
      return this.weekday;
    }
    get_discipline_e7nz0n_k$() {
      return this.discipline;
    }
    get_type_wovaf7_k$() {
      return this.type;
    }
    get_timeStart_8xqy24_k$() {
      return this.timeStart;
    }
    get_timeEnd_kgqluj_k$() {
      return this.timeEnd;
    }
    get_teacher_mjj6rr_k$() {
      return this.teacher;
    }
    get_room_wott0k_k$() {
      return this.room;
    }
    get_subgroup_4yf0nc_k$() {
      return this.subgroup;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.group;
    }
    component3_7eebsa_k$() {
      return this.date;
    }
    component4_7eebs9_k$() {
      return this.weekday;
    }
    component5_7eebs8_k$() {
      return this.discipline;
    }
    component6_7eebs7_k$() {
      return this.type;
    }
    component7_7eebs6_k$() {
      return this.timeStart;
    }
    component8_7eebs5_k$() {
      return this.timeEnd;
    }
    component9_7eebs4_k$() {
      return this.teacher;
    }
    component10_gazzfo_k$() {
      return this.room;
    }
    component11_gazzfn_k$() {
      return this.subgroup;
    }
    copy_j4c8fk_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup) {
      return Lesson.new_ru_uniplanner_shared_Lesson_b3q09k_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup);
    }
    copy(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup, $super) {
      id = id === VOID ? this.id : id;
      group = group === VOID ? this.group : group;
      date = date === VOID ? this.date : date;
      weekday = weekday === VOID ? this.weekday : weekday;
      discipline = discipline === VOID ? this.discipline : discipline;
      type = type === VOID ? this.type : type;
      timeStart = timeStart === VOID ? this.timeStart : timeStart;
      timeEnd = timeEnd === VOID ? this.timeEnd : timeEnd;
      teacher = teacher === VOID ? this.teacher : teacher;
      room = room === VOID ? this.room : room;
      subgroup = subgroup === VOID ? this.subgroup : subgroup;
      return $super === VOID ? this.copy_j4c8fk_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup) : $super.copy_j4c8fk_k$.call(this, id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup);
    }
    toString() {
      return 'Lesson(id=' + this.id + ', group=' + this.group + ', date=' + this.date + ', weekday=' + this.weekday + ', discipline=' + this.discipline + ', type=' + this.type + ', timeStart=' + this.timeStart + ', timeEnd=' + this.timeEnd + ', teacher=' + this.teacher + ', room=' + this.room + ', subgroup=' + this.subgroup + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.group) | 0;
      result = imul(result, 31) + getStringHashCode(this.date) | 0;
      result = imul(result, 31) + getStringHashCode(this.weekday) | 0;
      result = imul(result, 31) + getStringHashCode(this.discipline) | 0;
      result = imul(result, 31) + getStringHashCode(this.type) | 0;
      result = imul(result, 31) + getStringHashCode(this.timeStart) | 0;
      result = imul(result, 31) + getStringHashCode(this.timeEnd) | 0;
      result = imul(result, 31) + getStringHashCode(this.teacher) | 0;
      result = imul(result, 31) + getStringHashCode(this.room) | 0;
      result = imul(result, 31) + (this.subgroup == null ? 0 : getStringHashCode(this.subgroup)) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof Lesson))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.group === other.group))
        return false;
      if (!(this.date === other.date))
        return false;
      if (!(this.weekday === other.weekday))
        return false;
      if (!(this.discipline === other.discipline))
        return false;
      if (!(this.type === other.type))
        return false;
      if (!(this.timeStart === other.timeStart))
        return false;
      if (!(this.timeEnd === other.timeEnd))
        return false;
      if (!(this.teacher === other.teacher))
        return false;
      if (!(this.room === other.room))
        return false;
      if (!(this.subgroup == other.subgroup))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_Lesson_v736kh_k$(seen0, id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup, serializationConstructorMarker, $box) {
      Companion_getInstance_9();
      if (!(1023 === (1023 & seen0))) {
        throwMissingFieldException(seen0, 1023, $serializer_getInstance_8().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.group = group;
      $this.date = date;
      $this.weekday = weekday;
      $this.discipline = discipline;
      $this.type = type;
      $this.timeStart = timeStart;
      $this.timeEnd = timeEnd;
      $this.teacher = teacher;
      $this.room = room;
      if (0 === (seen0 & 1024))
        $this.subgroup = null;
      else
        $this.subgroup = subgroup;
      return $this;
    }
  }
  class Companion_10 {
    static new_ru_uniplanner_shared_GroupInfo_Companion_qd8jlx_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_10 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_9();
    }
  }
  class $serializer_10 {
    static new_ru_uniplanner_shared_GroupInfo_$serializer_6366xi_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_9 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.GroupInfo', $this, 4);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('name', false);
      tmp0_serialDesc.addElement_5pzumi_k$('institute', true);
      tmp0_serialDesc.addElement_5pzumi_k$('specialty', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_simclf_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.name);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.institute == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, StringSerializer_getInstance(), value.institute);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 3) ? true : !(value.specialty == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 3, StringSerializer_getInstance(), value.specialty);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_simclf_k$(encoder, value instanceof GroupInfo ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = 0;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_local3 = null;
      var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp8_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
        tmp3_bitMask0 = tmp3_bitMask0 | 8;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp8_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
      return GroupInfo.new_ru_uniplanner_shared_GroupInfo_31u7w_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [IntSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance())];
    }
  }
  class GroupInfo {
    constructor(id, name, institute, specialty) {
      return new.target.new_ru_uniplanner_shared_GroupInfo_kgg8ge_k$(id, name, institute, specialty);
    }
    static new_ru_uniplanner_shared_GroupInfo_kgg8ge_k$(id, name, institute, specialty, $box) {
      Companion_getInstance_10();
      institute = institute === VOID ? null : institute;
      specialty = specialty === VOID ? null : specialty;
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      $this.institute = institute;
      $this.specialty = specialty;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_name_woqyms_k$() {
      return this.name;
    }
    get_institute_94d1f0_k$() {
      return this.institute;
    }
    get_specialty_jihrqj_k$() {
      return this.specialty;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.name;
    }
    component3_7eebsa_k$() {
      return this.institute;
    }
    component4_7eebs9_k$() {
      return this.specialty;
    }
    copy_7ngwtz_k$(id, name, institute, specialty) {
      return GroupInfo.new_ru_uniplanner_shared_GroupInfo_kgg8ge_k$(id, name, institute, specialty);
    }
    copy(id, name, institute, specialty, $super) {
      id = id === VOID ? this.id : id;
      name = name === VOID ? this.name : name;
      institute = institute === VOID ? this.institute : institute;
      specialty = specialty === VOID ? this.specialty : specialty;
      return $super === VOID ? this.copy_7ngwtz_k$(id, name, institute, specialty) : $super.copy_7ngwtz_k$.call(this, id, name, institute, specialty);
    }
    toString() {
      return 'GroupInfo(id=' + this.id + ', name=' + this.name + ', institute=' + this.institute + ', specialty=' + this.specialty + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.name) | 0;
      result = imul(result, 31) + (this.institute == null ? 0 : getStringHashCode(this.institute)) | 0;
      result = imul(result, 31) + (this.specialty == null ? 0 : getStringHashCode(this.specialty)) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof GroupInfo))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.name === other.name))
        return false;
      if (!(this.institute == other.institute))
        return false;
      if (!(this.specialty == other.specialty))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_GroupInfo_31u7w_k$(seen0, id, name, institute, specialty, serializationConstructorMarker, $box) {
      Companion_getInstance_10();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_9().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      if (0 === (seen0 & 4))
        $this.institute = null;
      else
        $this.institute = institute;
      if (0 === (seen0 & 8))
        $this.specialty = null;
      else
        $this.specialty = specialty;
      return $this;
    }
  }
  class ModelValidators {
    static new_ru_uniplanner_shared_ModelValidators_byrebw_k$($box) {
      var $this = createThis(this, $box);
      ModelValidators_instance = $this;
      return $this;
    }
    validateUser(user) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (!isValidEmail(this, user.email)) {
        errors.add_utx5q5_k$('\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 email: ' + user.email);
      }
      if (isBlank(user.fullName)) {
        errors.add_utx5q5_k$('\u041F\u043E\u043B\u043D\u043E\u0435 \u0438\u043C\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (isBlank(user.groupName)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      return errors.isEmpty_y1axqb_k$() ? Valid_getInstance() : Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
    validateRegisterRequest(request) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (!isValidEmail(this, request.email)) {
        errors.add_utx5q5_k$('\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 email: ' + request.email);
      }
      if (request.password.length < 6) {
        errors.add_utx5q5_k$('\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 6 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
      }
      if (isBlank(request.fullName)) {
        errors.add_utx5q5_k$('\u041F\u043E\u043B\u043D\u043E\u0435 \u0438\u043C\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (isBlank(request.groupName)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      return errors.isEmpty_y1axqb_k$() ? Valid_getInstance() : Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
    validateLoginRequest(request) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (!isValidEmail(this, request.email)) {
        errors.add_utx5q5_k$('\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 email: ' + request.email);
      }
      if (isBlank(request.password)) {
        errors.add_utx5q5_k$('\u041F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      return errors.isEmpty_y1axqb_k$() ? Valid_getInstance() : Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
    validateTask(task) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (isBlank(task.title)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      var containsArg = task.priority;
      if (!(1 <= containsArg ? containsArg <= 5 : false)) {
        errors.add_utx5q5_k$('\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043E\u0442 1 \u0434\u043E 5, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E: ' + task.priority);
      }
      return errors.isEmpty_y1axqb_k$() ? Valid_getInstance() : Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
    validateTaskInput(input) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (isBlank(input.title)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      var containsArg = input.priority;
      if (!(1 <= containsArg ? containsArg <= 5 : false)) {
        errors.add_utx5q5_k$('\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043E\u0442 1 \u0434\u043E 5, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E: ' + input.priority);
      }
      return errors.isEmpty_y1axqb_k$() ? Valid_getInstance() : Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
    validateNote(note) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (isBlank(note.title)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (isBlank(note.content)) {
        errors.add_utx5q5_k$('\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      return errors.isEmpty_y1axqb_k$() ? Valid_getInstance() : Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
    validateNoteInput(input) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (isBlank(input.title)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (isBlank(input.content)) {
        errors.add_utx5q5_k$('\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      return errors.isEmpty_y1axqb_k$() ? Valid_getInstance() : Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
    validateLesson(lesson) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (isBlank(lesson.group)) {
        errors.add_utx5q5_k$('\u0413\u0440\u0443\u043F\u043F\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u043E\u0439');
      }
      if (isBlank(lesson.discipline)) {
        errors.add_utx5q5_k$('\u0414\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u043E\u0439');
      }
      if (isBlank(lesson.type)) {
        errors.add_utx5q5_k$('\u0422\u0438\u043F \u0437\u0430\u043D\u044F\u0442\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (isBlank(lesson.timeStart)) {
        errors.add_utx5q5_k$('\u0412\u0440\u0435\u043C\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (isBlank(lesson.timeEnd)) {
        errors.add_utx5q5_k$('\u0412\u0440\u0435\u043C\u044F \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F \u0437\u0430\u043D\u044F\u0442\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      return errors.isEmpty_y1axqb_k$() ? Valid_getInstance() : Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
  }
  class ValidationResult {
    static new_ru_uniplanner_shared_ValidationResult_f8juno_k$($box) {
      return createThis(this, $box);
    }
    get_isValid_zh4f7b_k$() {
      return this instanceof Valid;
    }
  }
  class Valid extends ValidationResult {
    static new_ru_uniplanner_shared_ValidationResult_Valid_6b93cx_k$($box) {
      Valid_instance = null;
      var $this = this.new_ru_uniplanner_shared_ValidationResult_f8juno_k$($box);
      Valid_instance = $this;
      return $this;
    }
  }
  class Invalid extends ValidationResult {
    static new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors, $box) {
      var $this = this.new_ru_uniplanner_shared_ValidationResult_f8juno_k$($box);
      $this.errors_1 = errors;
      return $this;
    }
    get_errors_czzmno_k$() {
      return this.errors_1;
    }
    component1_7eebsc_k$() {
      return this.errors_1;
    }
    copy_is4t59_k$(errors) {
      return Invalid.new_ru_uniplanner_shared_ValidationResult_Invalid_guivwr_k$(errors);
    }
    copy$default_g6wsce_k$(errors, $super) {
      errors = errors === VOID ? this.errors_1 : errors;
      return $super === VOID ? this.copy_is4t59_k$(errors) : $super.copy_is4t59_k$.call(this, errors);
    }
    toString() {
      return 'Invalid(errors=' + toString_0(this.errors_1) + ')';
    }
    hashCode() {
      return hashCode(this.errors_1);
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof Invalid))
        return false;
      if (!equals(this.errors_1, other.errors_1))
        return false;
      return true;
    }
  }
  //endregion
  var ApiConstants_instance;
  function ApiConstants_getInstance() {
    if (ApiConstants_instance === VOID)
      ApiConstants.new_ru_uniplanner_shared_ApiConstants_3e82cy_k$();
    return ApiConstants_instance;
  }
  function _get_typeSerial0__3fdbgx($this) {
    return $this.typeSerial0__1;
  }
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance === VOID)
      Companion.new_ru_uniplanner_shared_ApiResponse_Companion_kql6bh_k$();
    return Companion_instance;
  }
  var Companion_instance_0;
  function Companion_getInstance_0() {
    if (Companion_instance_0 === VOID)
      Companion_0.new_ru_uniplanner_shared_ErrorResponse_Companion_subrut_k$();
    return Companion_instance_0;
  }
  var $serializer_instance;
  function $serializer_getInstance() {
    if ($serializer_instance === VOID)
      $serializer_0.new_ru_uniplanner_shared_ErrorResponse_$serializer_mpoasy_k$();
    return $serializer_instance;
  }
  var Companion_instance_1;
  function Companion_getInstance_1() {
    if (Companion_instance_1 === VOID)
      Companion_1.new_ru_uniplanner_shared_User_Companion_tndc3b_k$();
    return Companion_instance_1;
  }
  var $serializer_instance_0;
  function $serializer_getInstance_0() {
    if ($serializer_instance_0 === VOID)
      $serializer_1.new_ru_uniplanner_shared_User_$serializer_gagiiq_k$();
    return $serializer_instance_0;
  }
  var Companion_instance_2;
  function Companion_getInstance_2() {
    if (Companion_instance_2 === VOID)
      Companion_2.new_ru_uniplanner_shared_RegisterRequest_Companion_cot3s5_k$();
    return Companion_instance_2;
  }
  var $serializer_instance_1;
  function $serializer_getInstance_1() {
    if ($serializer_instance_1 === VOID)
      $serializer_2.new_ru_uniplanner_shared_RegisterRequest_$serializer_wj2f63_k$();
    return $serializer_instance_1;
  }
  var Companion_instance_3;
  function Companion_getInstance_3() {
    if (Companion_instance_3 === VOID)
      Companion_3.new_ru_uniplanner_shared_LoginRequest_Companion_1gv41t_k$();
    return Companion_instance_3;
  }
  var $serializer_instance_2;
  function $serializer_getInstance_2() {
    if ($serializer_instance_2 === VOID)
      $serializer_3.new_ru_uniplanner_shared_LoginRequest_$serializer_oeqmcv_k$();
    return $serializer_instance_2;
  }
  var Companion_instance_4;
  function Companion_getInstance_4() {
    if (Companion_instance_4 === VOID)
      Companion_4.new_ru_uniplanner_shared_LoginResponse_Companion_uwl4dh_k$();
    return Companion_instance_4;
  }
  var $serializer_instance_3;
  function $serializer_getInstance_3() {
    if ($serializer_instance_3 === VOID)
      $serializer_4.new_ru_uniplanner_shared_LoginResponse_$serializer_ype9d9_k$();
    return $serializer_instance_3;
  }
  var Companion_instance_5;
  function Companion_getInstance_5() {
    if (Companion_instance_5 === VOID)
      Companion_5.new_ru_uniplanner_shared_Task_Companion_fcuw3h_k$();
    return Companion_instance_5;
  }
  var $serializer_instance_4;
  function $serializer_getInstance_4() {
    if ($serializer_instance_4 === VOID)
      $serializer_5.new_ru_uniplanner_shared_Task_$serializer_wsnrv8_k$();
    return $serializer_instance_4;
  }
  var Companion_instance_6;
  function Companion_getInstance_6() {
    if (Companion_instance_6 === VOID)
      Companion_6.new_ru_uniplanner_shared_TaskInput_Companion_da6fd1_k$();
    return Companion_instance_6;
  }
  var $serializer_instance_5;
  function $serializer_getInstance_5() {
    if ($serializer_instance_5 === VOID)
      $serializer_6.new_ru_uniplanner_shared_TaskInput_$serializer_y50ovm_k$();
    return $serializer_instance_5;
  }
  var Companion_instance_7;
  function Companion_getInstance_7() {
    if (Companion_instance_7 === VOID)
      Companion_7.new_ru_uniplanner_shared_Note_Companion_4mi1j_k$();
    return Companion_instance_7;
  }
  var $serializer_instance_6;
  function $serializer_getInstance_6() {
    if ($serializer_instance_6 === VOID)
      $serializer_7.new_ru_uniplanner_shared_Note_$serializer_xvbhkd_k$();
    return $serializer_instance_6;
  }
  var Companion_instance_8;
  function Companion_getInstance_8() {
    if (Companion_instance_8 === VOID)
      Companion_8.new_ru_uniplanner_shared_NoteInput_Companion_da7tet_k$();
    return Companion_instance_8;
  }
  var $serializer_instance_7;
  function $serializer_getInstance_7() {
    if ($serializer_instance_7 === VOID)
      $serializer_8.new_ru_uniplanner_shared_NoteInput_$serializer_q6n0w1_k$();
    return $serializer_instance_7;
  }
  var Companion_instance_9;
  function Companion_getInstance_9() {
    if (Companion_instance_9 === VOID)
      Companion_9.new_ru_uniplanner_shared_Lesson_Companion_okg23n_k$();
    return Companion_instance_9;
  }
  var $serializer_instance_8;
  function $serializer_getInstance_8() {
    if ($serializer_instance_8 === VOID)
      $serializer_9.new_ru_uniplanner_shared_Lesson_$serializer_8cinq3_k$();
    return $serializer_instance_8;
  }
  var Companion_instance_10;
  function Companion_getInstance_10() {
    if (Companion_instance_10 === VOID)
      Companion_10.new_ru_uniplanner_shared_GroupInfo_Companion_qd8jlx_k$();
    return Companion_instance_10;
  }
  var $serializer_instance_9;
  function $serializer_getInstance_9() {
    if ($serializer_instance_9 === VOID)
      $serializer_10.new_ru_uniplanner_shared_GroupInfo_$serializer_6366xi_k$();
    return $serializer_instance_9;
  }
  function isValidEmail($this, email) {
    var emailRegex = Regex.new_kotlin_text_Regex_w1xv3y_k$('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');
    return emailRegex.matches_evli6i_k$(email);
  }
  var ModelValidators_instance;
  function ModelValidators_getInstance() {
    if (ModelValidators_instance === VOID)
      ModelValidators.new_ru_uniplanner_shared_ModelValidators_byrebw_k$();
    return ModelValidators_instance;
  }
  var Valid_instance;
  function Valid_getInstance() {
    if (Valid_instance === VOID)
      Valid.new_ru_uniplanner_shared_ValidationResult_Valid_6b93cx_k$();
    return Valid_instance;
  }
  function requireValid(_this__u8e3s4) {
    if (_this__u8e3s4 instanceof Invalid) {
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_f8t9r5_k$('\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u0438: ' + joinToString(_this__u8e3s4.errors_1, ', '));
    }
  }
  //region block: post-declaration
  initMetadataForObject(ApiConstants, 'ApiConstants');
  initMetadataForCompanion(Companion, VOID, [SerializerFactory]);
  initMetadataForClass($serializer, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ApiResponse, 'ApiResponse', ApiResponse.new_ru_uniplanner_shared_ApiResponse_y5eog7_k$, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: Companion_getInstance});
  initMetadataForClass(ScheduleParams, 'ScheduleParams');
  initMetadataForClass(TaskUpdateParams, 'TaskUpdateParams', TaskUpdateParams.new_ru_uniplanner_shared_TaskUpdateParams_dzyyqp_k$);
  initMetadataForCompanion(Companion_0);
  protoOf($serializer_0).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_0, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ErrorResponse, 'ErrorResponse', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance});
  initMetadataForCompanion(Companion_1);
  protoOf($serializer_1).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_1, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(User, 'User', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_0});
  initMetadataForCompanion(Companion_2);
  protoOf($serializer_2).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_2, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(RegisterRequest, 'RegisterRequest', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_1});
  initMetadataForCompanion(Companion_3);
  protoOf($serializer_3).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_3, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(LoginRequest, 'LoginRequest', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_2});
  initMetadataForCompanion(Companion_4);
  protoOf($serializer_4).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_4, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(LoginResponse, 'LoginResponse', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_3});
  initMetadataForCompanion(Companion_5);
  protoOf($serializer_5).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_5, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Task, 'Task', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_4});
  initMetadataForCompanion(Companion_6);
  protoOf($serializer_6).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_6, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(TaskInput, 'TaskInput', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_5});
  initMetadataForCompanion(Companion_7);
  protoOf($serializer_7).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_7, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Note, 'Note', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_6});
  initMetadataForCompanion(Companion_8);
  protoOf($serializer_8).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_8, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(NoteInput, 'NoteInput', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_7});
  initMetadataForCompanion(Companion_9);
  protoOf($serializer_9).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_9, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Lesson, 'Lesson', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_8});
  initMetadataForCompanion(Companion_10);
  protoOf($serializer_10).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_10, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(GroupInfo, 'GroupInfo', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_9});
  initMetadataForObject(ModelValidators, 'ModelValidators');
  initMetadataForClass(ValidationResult, 'ValidationResult');
  initMetadataForObject(Valid, 'Valid');
  initMetadataForClass(Invalid, 'Invalid');
  //endregion
  //region block: exports
  function $jsExportAll$(_) {
    var $ru = _.ru || (_.ru = {});
    var $ru$uniplanner = $ru.uniplanner || ($ru.uniplanner = {});
    var $ru$uniplanner$shared = $ru$uniplanner.shared || ($ru$uniplanner.shared = {});
    defineProp($ru$uniplanner$shared, 'ApiConstants', ApiConstants_getInstance, VOID, true);
    $ru$uniplanner$shared.ApiResponse = ApiResponse;
    $ru$uniplanner$shared.ScheduleParams = ScheduleParams;
    $ru$uniplanner$shared.TaskUpdateParams = TaskUpdateParams;
    var $ru = _.ru || (_.ru = {});
    var $ru$uniplanner = $ru.uniplanner || ($ru.uniplanner = {});
    var $ru$uniplanner$shared = $ru$uniplanner.shared || ($ru$uniplanner.shared = {});
    $ru$uniplanner$shared.ErrorResponse = ErrorResponse;
    $ru$uniplanner$shared.User = User;
    $ru$uniplanner$shared.RegisterRequest = RegisterRequest;
    $ru$uniplanner$shared.LoginRequest = LoginRequest;
    $ru$uniplanner$shared.LoginResponse = LoginResponse;
    $ru$uniplanner$shared.Task = Task;
    $ru$uniplanner$shared.TaskInput = TaskInput;
    $ru$uniplanner$shared.Note = Note;
    $ru$uniplanner$shared.NoteInput = NoteInput;
    $ru$uniplanner$shared.Lesson = Lesson;
    $ru$uniplanner$shared.GroupInfo = GroupInfo;
    var $ru = _.ru || (_.ru = {});
    var $ru$uniplanner = $ru.uniplanner || ($ru.uniplanner = {});
    var $ru$uniplanner$shared = $ru$uniplanner.shared || ($ru$uniplanner.shared = {});
    defineProp($ru$uniplanner$shared, 'ModelValidators', ModelValidators_getInstance, VOID, true);
  }
  $jsExportAll$(_);
  //endregion
  return _;
}(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js')));

//# sourceMappingURL=shared.js.map
