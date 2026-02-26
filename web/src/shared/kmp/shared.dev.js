(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var createThis = kotlin_kotlin.$_$.h4;
  var initMetadataForObject = kotlin_kotlin.$_$.r4;
  var VOID = kotlin_kotlin.$_$.c;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var initMetadataForCompanion = kotlin_kotlin.$_$.p4;
  var THROW_CCE = kotlin_kotlin.$_$.d6;
  var UnknownFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var get_nullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var BooleanSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var initMetadataForClass = kotlin_kotlin.$_$.o4;
  var toString = kotlin_kotlin.$_$.t6;
  var hashCode = kotlin_kotlin.$_$.n4;
  var getBooleanHashCode = kotlin_kotlin.$_$.k4;
  var equals = kotlin_kotlin.$_$.j4;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p;
  var getAssociatedObjectId = kotlin_kotlin.$_$.b;
  var SerializableWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var protoOf = kotlin_kotlin.$_$.f5;
  var getStringHashCode = kotlin_kotlin.$_$.m4;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var ArrayListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.d;
  var lazy = kotlin_kotlin.$_$.q6;
  var defineProp = kotlin_kotlin.$_$.i4;
  var listOf = kotlin_kotlin.$_$.s3;
  var Regex = kotlin_kotlin.$_$.q5;
  var ArrayList = kotlin_kotlin.$_$.j2;
  var isBlank = kotlin_kotlin.$_$.r5;
  var compareTo = kotlin_kotlin.$_$.g4;
  var emptyList = kotlin_kotlin.$_$.l3;
  var toString_0 = kotlin_kotlin.$_$.h5;
  var IllegalArgumentException = kotlin_kotlin.$_$.x5;
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
      $this.ENDPOINT_PARSER_STATUS = '/parser/status';
      $this.ENDPOINT_PARSER_SYNC = '/parser/sync';
      $this.ENDPOINT_PARSER_INSTITUTES = '/parser/institutes';
      $this.ENDPOINT_PARSER_SPECIALTIES = '/parser/specialties';
      $this.ENDPOINT_PARSER_GROUPS = '/parser/groups';
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
    get_ENDPOINT_PARSER_STATUS_1zujn5_k$() {
      return this.ENDPOINT_PARSER_STATUS;
    }
    get_ENDPOINT_PARSER_SYNC_x6ns12_k$() {
      return this.ENDPOINT_PARSER_SYNC;
    }
    get_ENDPOINT_PARSER_INSTITUTES_b0b69v_k$() {
      return this.ENDPOINT_PARSER_INSTITUTES;
    }
    get_ENDPOINT_PARSER_SPECIALTIES_f9xgv7_k$() {
      return this.ENDPOINT_PARSER_SPECIALTIES;
    }
    get_ENDPOINT_PARSER_GROUPS_3pjju5_k$() {
      return this.ENDPOINT_PARSER_GROUPS;
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
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, $serializer_getInstance_2(), value.error);
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
        tmp5_local1 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, $serializer_getInstance_2(), tmp5_local1);
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
              tmp5_local1 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, $serializer_getInstance_2(), tmp5_local1);
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
      return [get_nullable(this.typeSerial0__1), get_nullable($serializer_getInstance_2()), BooleanSerializer_getInstance()];
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
  class Companion_0 {
    static new_ru_uniplanner_shared_ScheduleParams_Companion_9632fn_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_0 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance();
    }
  }
  class $serializer_0 {
    static new_ru_uniplanner_shared_ScheduleParams_$serializer_1vvzfw_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.ScheduleParams', $this, 2);
      tmp0_serialDesc.addElement_5pzumi_k$('group', false);
      tmp0_serialDesc.addElement_5pzumi_k$('date', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_socw73_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.group);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.date == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, StringSerializer_getInstance(), value.date);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_socw73_k$(encoder, value instanceof ScheduleParams ? value : THROW_CCE());
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
        tmp5_local1 = tmp6_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
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
              tmp5_local1 = tmp6_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp6_input.endStructure_1xqz0n_k$(tmp0_desc);
      return ScheduleParams.new_ru_uniplanner_shared_ScheduleParams_tlidz3_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance())];
    }
  }
  class ScheduleParams {
    constructor(group, date) {
      return new.target.new_ru_uniplanner_shared_ScheduleParams_bubrji_k$(group, date);
    }
    static new_ru_uniplanner_shared_ScheduleParams_bubrji_k$(group, date, $box) {
      Companion_getInstance_0();
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
    static new_ru_uniplanner_shared_ScheduleParams_tlidz3_k$(seen0, group, date, serializationConstructorMarker, $box) {
      Companion_getInstance_0();
      if (!(1 === (1 & seen0))) {
        throwMissingFieldException(seen0, 1, $serializer_getInstance().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.group = group;
      if (0 === (seen0 & 2))
        $this.date = null;
      else
        $this.date = date;
      return $this;
    }
  }
  class Companion_1 {
    static new_ru_uniplanner_shared_TaskUpdateParams_Companion_jf8nvp_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_1 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_0();
    }
  }
  class $serializer_1 {
    static new_ru_uniplanner_shared_TaskUpdateParams_$serializer_o1xol5_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_0 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.TaskUpdateParams', $this, 5);
      tmp0_serialDesc.addElement_5pzumi_k$('title', true);
      tmp0_serialDesc.addElement_5pzumi_k$('description', true);
      tmp0_serialDesc.addElement_5pzumi_k$('deadline', true);
      tmp0_serialDesc.addElement_5pzumi_k$('priority', true);
      tmp0_serialDesc.addElement_5pzumi_k$('completed', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_2snybc_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 0) ? true : !(value.title == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 0, StringSerializer_getInstance(), value.title);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.description == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, StringSerializer_getInstance(), value.description);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.deadline == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, StringSerializer_getInstance(), value.deadline);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 3) ? true : !(value.priority == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 3, IntSerializer_getInstance(), value.priority);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 4) ? true : !(value.completed == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 4, BooleanSerializer_getInstance(), value.completed);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_2snybc_k$(encoder, value instanceof TaskUpdateParams ? value : THROW_CCE());
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
      var tmp8_local4 = null;
      var tmp9_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp9_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 3, IntSerializer_getInstance(), tmp7_local3);
        tmp3_bitMask0 = tmp3_bitMask0 | 8;
        tmp8_local4 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 4, BooleanSerializer_getInstance(), tmp8_local4);
        tmp3_bitMask0 = tmp3_bitMask0 | 16;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp9_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 3, IntSerializer_getInstance(), tmp7_local3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            case 4:
              tmp8_local4 = tmp9_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 4, BooleanSerializer_getInstance(), tmp8_local4);
              tmp3_bitMask0 = tmp3_bitMask0 | 16;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp9_input.endStructure_1xqz0n_k$(tmp0_desc);
      return TaskUpdateParams.new_ru_uniplanner_shared_TaskUpdateParams_iedhxp_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(IntSerializer_getInstance()), get_nullable(BooleanSerializer_getInstance())];
    }
  }
  class TaskUpdateParams {
    constructor(title, description, deadline, priority, completed) {
      return new.target.new_ru_uniplanner_shared_TaskUpdateParams_dzyyqp_k$(title, description, deadline, priority, completed);
    }
    static new_ru_uniplanner_shared_TaskUpdateParams_dzyyqp_k$(title, description, deadline, priority, completed, $box) {
      Companion_getInstance_1();
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
    static new_ru_uniplanner_shared_TaskUpdateParams_iedhxp_k$(seen0, title, description, deadline, priority, completed, serializationConstructorMarker, $box) {
      Companion_getInstance_1();
      if (!(0 === (0 & seen0))) {
        throwMissingFieldException(seen0, 0, $serializer_getInstance_0().descriptor_1);
      }
      var $this = createThis(this, $box);
      if (0 === (seen0 & 1))
        $this.title = null;
      else
        $this.title = title;
      if (0 === (seen0 & 2))
        $this.description = null;
      else
        $this.description = description;
      if (0 === (seen0 & 4))
        $this.deadline = null;
      else
        $this.deadline = deadline;
      if (0 === (seen0 & 8))
        $this.priority = null;
      else
        $this.priority = priority;
      if (0 === (seen0 & 16))
        $this.completed = null;
      else
        $this.completed = completed;
      return $this;
    }
  }
  class Companion_2 {
    static new_ru_uniplanner_shared_ParserSyncParams_Companion_fw0pyr_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_2 = $this;
      var tmp = $this;
      var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp.$childSerializers_1 = [null, null, lazy(tmp_0, ParserSyncParams$Companion$$childSerializers$_anonymous__9jxsiy)];
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_1();
    }
  }
  class $serializer_2 {
    static new_ru_uniplanner_shared_ParserSyncParams_$serializer_mhxghv_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_1 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.ParserSyncParams', $this, 3);
      tmp0_serialDesc.addElement_5pzumi_k$('startDate', true);
      tmp0_serialDesc.addElement_5pzumi_k$('endDate', true);
      tmp0_serialDesc.addElement_5pzumi_k$('groups', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_tv3auc_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      var tmp2_cached = Companion_getInstance_2().$childSerializers_1;
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 0) ? true : !(value.startDate == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 0, StringSerializer_getInstance(), value.startDate);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.endDate == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, StringSerializer_getInstance(), value.endDate);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.groups == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, tmp2_cached[2].get_value_j01efc_k$(), value.groups);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_tv3auc_k$(encoder, value instanceof ParserSyncParams ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      var tmp8_cached = Companion_getInstance_2().$childSerializers_1;
      if (tmp7_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, tmp8_cached[2].get_value_j01efc_k$(), tmp6_local2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp7_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, tmp8_cached[2].get_value_j01efc_k$(), tmp6_local2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp7_input.endStructure_1xqz0n_k$(tmp0_desc);
      return ParserSyncParams.new_ru_uniplanner_shared_ParserSyncParams_eh8z78_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      var tmp0_cached = Companion_getInstance_2().$childSerializers_1;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(tmp0_cached[2].get_value_j01efc_k$())];
    }
  }
  class ParserSyncParams {
    constructor(startDate, endDate, groups) {
      return new.target.new_ru_uniplanner_shared_ParserSyncParams_2yur14_k$(startDate, endDate, groups);
    }
    static new_ru_uniplanner_shared_ParserSyncParams_2yur14_k$(startDate, endDate, groups, $box) {
      Companion_getInstance_2();
      startDate = startDate === VOID ? null : startDate;
      endDate = endDate === VOID ? null : endDate;
      groups = groups === VOID ? null : groups;
      var $this = createThis(this, $box);
      $this.startDate = startDate;
      $this.endDate = endDate;
      $this.groups = groups;
      return $this;
    }
    get_startDate_qphqpl_k$() {
      return this.startDate;
    }
    get_endDate_pbn8ao_k$() {
      return this.endDate;
    }
    get_groups_dy12vx_k$() {
      return this.groups;
    }
    component1_7eebsc_k$() {
      return this.startDate;
    }
    component2_7eebsb_k$() {
      return this.endDate;
    }
    component3_7eebsa_k$() {
      return this.groups;
    }
    copy_mvs6wo_k$(startDate, endDate, groups) {
      return ParserSyncParams.new_ru_uniplanner_shared_ParserSyncParams_2yur14_k$(startDate, endDate, groups);
    }
    copy(startDate, endDate, groups, $super) {
      startDate = startDate === VOID ? this.startDate : startDate;
      endDate = endDate === VOID ? this.endDate : endDate;
      groups = groups === VOID ? this.groups : groups;
      return $super === VOID ? this.copy_mvs6wo_k$(startDate, endDate, groups) : $super.copy_mvs6wo_k$.call(this, startDate, endDate, groups);
    }
    toString() {
      return 'ParserSyncParams(startDate=' + this.startDate + ', endDate=' + this.endDate + ', groups=' + toString(this.groups) + ')';
    }
    hashCode() {
      var result = this.startDate == null ? 0 : getStringHashCode(this.startDate);
      result = imul(result, 31) + (this.endDate == null ? 0 : getStringHashCode(this.endDate)) | 0;
      result = imul(result, 31) + (this.groups == null ? 0 : hashCode(this.groups)) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof ParserSyncParams))
        return false;
      if (!(this.startDate == other.startDate))
        return false;
      if (!(this.endDate == other.endDate))
        return false;
      if (!equals(this.groups, other.groups))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_ParserSyncParams_eh8z78_k$(seen0, startDate, endDate, groups, serializationConstructorMarker, $box) {
      Companion_getInstance_2();
      if (!(0 === (0 & seen0))) {
        throwMissingFieldException(seen0, 0, $serializer_getInstance_1().descriptor_1);
      }
      var $this = createThis(this, $box);
      if (0 === (seen0 & 1))
        $this.startDate = null;
      else
        $this.startDate = startDate;
      if (0 === (seen0 & 2))
        $this.endDate = null;
      else
        $this.endDate = endDate;
      if (0 === (seen0 & 4))
        $this.groups = null;
      else
        $this.groups = groups;
      return $this;
    }
  }
  class Companion_3 {
    static new_ru_uniplanner_shared_ErrorResponse_Companion_subrut_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_3 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_2();
    }
  }
  class $serializer_3 {
    static new_ru_uniplanner_shared_ErrorResponse_$serializer_mpoasy_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_2 = $this;
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
      Companion_getInstance_3();
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
      Companion_getInstance_3();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_2().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.code = code;
      $this.message = message;
      return $this;
    }
  }
  class Companion_4 {
    static new_ru_uniplanner_shared_User_Companion_tndc3b_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_4 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_3();
    }
  }
  class $serializer_4 {
    static new_ru_uniplanner_shared_User_$serializer_gagiiq_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_3 = $this;
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
      Companion_getInstance_4();
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
      Companion_getInstance_4();
      if (!(15 === (15 & seen0))) {
        throwMissingFieldException(seen0, 15, $serializer_getInstance_3().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.email = email;
      $this.fullName = fullName;
      $this.groupName = groupName;
      return $this;
    }
  }
  class Companion_5 {
    static new_ru_uniplanner_shared_RegisterRequest_Companion_cot3s5_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_5 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_4();
    }
  }
  class $serializer_5 {
    static new_ru_uniplanner_shared_RegisterRequest_$serializer_wj2f63_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_4 = $this;
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
      Companion_getInstance_5();
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
      Companion_getInstance_5();
      if (!(15 === (15 & seen0))) {
        throwMissingFieldException(seen0, 15, $serializer_getInstance_4().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.email = email;
      $this.password = password;
      $this.fullName = fullName;
      $this.groupName = groupName;
      return $this;
    }
  }
  class Companion_6 {
    static new_ru_uniplanner_shared_LoginRequest_Companion_1gv41t_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_6 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_5();
    }
  }
  class $serializer_6 {
    static new_ru_uniplanner_shared_LoginRequest_$serializer_oeqmcv_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_5 = $this;
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
      Companion_getInstance_6();
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
      Companion_getInstance_6();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_5().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.email = email;
      $this.password = password;
      return $this;
    }
  }
  class Companion_7 {
    static new_ru_uniplanner_shared_LoginResponse_Companion_uwl4dh_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_7 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_6();
    }
  }
  class $serializer_7 {
    static new_ru_uniplanner_shared_LoginResponse_$serializer_ype9d9_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_6 = $this;
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
      tmp1_output.encodeSerializableElement_isqxcl_k$(tmp0_desc, 1, $serializer_getInstance_3(), value.user);
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
        tmp5_local1 = tmp6_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 1, $serializer_getInstance_3(), tmp5_local1);
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
              tmp5_local1 = tmp6_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 1, $serializer_getInstance_3(), tmp5_local1);
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
      return [StringSerializer_getInstance(), $serializer_getInstance_3()];
    }
  }
  class LoginResponse {
    constructor(token, user) {
      return new.target.new_ru_uniplanner_shared_LoginResponse_b85j7k_k$(token, user);
    }
    static new_ru_uniplanner_shared_LoginResponse_b85j7k_k$(token, user, $box) {
      Companion_getInstance_7();
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
      Companion_getInstance_7();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_6().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.token = token;
      $this.user = user;
      return $this;
    }
  }
  class Companion_8 {
    static new_ru_uniplanner_shared_Task_Companion_fcuw3h_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_8 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_7();
    }
  }
  class $serializer_8 {
    static new_ru_uniplanner_shared_Task_$serializer_wsnrv8_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_7 = $this;
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
      Companion_getInstance_8();
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
      Companion_getInstance_8();
      if (!(59 === (59 & seen0))) {
        throwMissingFieldException(seen0, 59, $serializer_getInstance_7().descriptor_1);
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
  class Companion_9 {
    static new_ru_uniplanner_shared_TaskInput_Companion_da6fd1_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_9 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_8();
    }
  }
  class $serializer_9 {
    static new_ru_uniplanner_shared_TaskInput_$serializer_y50ovm_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_8 = $this;
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
      Companion_getInstance_9();
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
      Companion_getInstance_9();
      if (!(13 === (13 & seen0))) {
        throwMissingFieldException(seen0, 13, $serializer_getInstance_8().descriptor_1);
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
  class Companion_10 {
    static new_ru_uniplanner_shared_Note_Companion_4mi1j_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_10 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_9();
    }
  }
  class $serializer_10 {
    static new_ru_uniplanner_shared_Note_$serializer_xvbhkd_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_9 = $this;
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
      Companion_getInstance_10();
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
      Companion_getInstance_10();
      if (!(7 === (7 & seen0))) {
        throwMissingFieldException(seen0, 7, $serializer_getInstance_9().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.title = title;
      $this.content = content;
      return $this;
    }
  }
  class Companion_11 {
    static new_ru_uniplanner_shared_NoteInput_Companion_da7tet_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_11 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_10();
    }
  }
  class $serializer_11 {
    static new_ru_uniplanner_shared_NoteInput_$serializer_q6n0w1_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_10 = $this;
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
      Companion_getInstance_11();
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
      Companion_getInstance_11();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_10().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.title = title;
      $this.content = content;
      return $this;
    }
  }
  class Companion_12 {
    static new_ru_uniplanner_shared_Lesson_Companion_okg23n_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_12 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_11();
    }
  }
  class $serializer_12 {
    static new_ru_uniplanner_shared_Lesson_$serializer_8cinq3_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_11 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.Lesson', $this, 11);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('group', false);
      tmp0_serialDesc.addElement_5pzumi_k$('date', false);
      tmp0_serialDesc.addElement_5pzumi_k$('weekday', false);
      tmp0_serialDesc.addElement_5pzumi_k$('discipline', false);
      tmp0_serialDesc.addElement_5pzumi_k$('type', false);
      tmp0_serialDesc.addElement_5pzumi_k$('timeStart', false);
      tmp0_serialDesc.addElement_5pzumi_k$('timeEnd', false);
      tmp0_serialDesc.addElement_5pzumi_k$('teacher', true);
      tmp0_serialDesc.addElement_5pzumi_k$('room', true);
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
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 8) ? true : !(value.teacher == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 8, StringSerializer_getInstance(), value.teacher);
      }
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 9) ? true : !(value.room == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 9, StringSerializer_getInstance(), value.room);
      }
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
        tmp12_local8 = tmp15_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 8, StringSerializer_getInstance(), tmp12_local8);
        tmp3_bitMask0 = tmp3_bitMask0 | 256;
        tmp13_local9 = tmp15_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 9, StringSerializer_getInstance(), tmp13_local9);
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
              tmp12_local8 = tmp15_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 8, StringSerializer_getInstance(), tmp12_local8);
              tmp3_bitMask0 = tmp3_bitMask0 | 256;
              break;
            case 9:
              tmp13_local9 = tmp15_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 9, StringSerializer_getInstance(), tmp13_local9);
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
      return [IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance())];
    }
  }
  class Lesson {
    constructor(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup) {
      return new.target.new_ru_uniplanner_shared_Lesson_k9vqvs_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup);
    }
    static new_ru_uniplanner_shared_Lesson_k9vqvs_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup, $box) {
      Companion_getInstance_12();
      teacher = teacher === VOID ? null : teacher;
      room = room === VOID ? null : room;
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
    copy_2es7cy_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup) {
      return Lesson.new_ru_uniplanner_shared_Lesson_k9vqvs_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup);
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
      return $super === VOID ? this.copy_2es7cy_k$(id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup) : $super.copy_2es7cy_k$.call(this, id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup);
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
      result = imul(result, 31) + (this.teacher == null ? 0 : getStringHashCode(this.teacher)) | 0;
      result = imul(result, 31) + (this.room == null ? 0 : getStringHashCode(this.room)) | 0;
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
      if (!(this.teacher == other.teacher))
        return false;
      if (!(this.room == other.room))
        return false;
      if (!(this.subgroup == other.subgroup))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_Lesson_v736kh_k$(seen0, id, group, date, weekday, discipline, type, timeStart, timeEnd, teacher, room, subgroup, serializationConstructorMarker, $box) {
      Companion_getInstance_12();
      if (!(255 === (255 & seen0))) {
        throwMissingFieldException(seen0, 255, $serializer_getInstance_11().descriptor_1);
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
      if (0 === (seen0 & 256))
        $this.teacher = null;
      else
        $this.teacher = teacher;
      if (0 === (seen0 & 512))
        $this.room = null;
      else
        $this.room = room;
      if (0 === (seen0 & 1024))
        $this.subgroup = null;
      else
        $this.subgroup = subgroup;
      return $this;
    }
  }
  class Companion_13 {
    static new_ru_uniplanner_shared_GroupInfo_Companion_qd8jlx_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_13 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_12();
    }
  }
  class $serializer_13 {
    static new_ru_uniplanner_shared_GroupInfo_$serializer_6366xi_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_12 = $this;
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
      Companion_getInstance_13();
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
      Companion_getInstance_13();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_12().descriptor_1);
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
  class Companion_14 {
    static new_ru_uniplanner_shared_Institute_Companion_im8tdn_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_14 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_13();
    }
  }
  class $serializer_14 {
    static new_ru_uniplanner_shared_Institute_$serializer_a2034u_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_13 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.Institute', $this, 4);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('shortName', false);
      tmp0_serialDesc.addElement_5pzumi_k$('name', false);
      tmp0_serialDesc.addElement_5pzumi_k$('branchId', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_1ktqwl_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.shortName);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.name);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 3) ? true : !(value.branchId === 1)) {
        tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 3, value.branchId);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_1ktqwl_k$(encoder, value instanceof Institute ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = 0;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_local3 = 0;
      var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp8_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 3);
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
              tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
      return Institute.new_ru_uniplanner_shared_Institute_38humx_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), IntSerializer_getInstance()];
    }
  }
  class Institute {
    constructor(id, shortName, name, branchId) {
      return new.target.new_ru_uniplanner_shared_Institute_qidr3p_k$(id, shortName, name, branchId);
    }
    static new_ru_uniplanner_shared_Institute_qidr3p_k$(id, shortName, name, branchId, $box) {
      Companion_getInstance_14();
      branchId = branchId === VOID ? 1 : branchId;
      var $this = createThis(this, $box);
      $this.id = id;
      $this.shortName = shortName;
      $this.name = name;
      $this.branchId = branchId;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_shortName_p10yo2_k$() {
      return this.shortName;
    }
    get_name_woqyms_k$() {
      return this.name;
    }
    get_branchId_w82biy_k$() {
      return this.branchId;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.shortName;
    }
    component3_7eebsa_k$() {
      return this.name;
    }
    component4_7eebs9_k$() {
      return this.branchId;
    }
    copy_po9waz_k$(id, shortName, name, branchId) {
      return Institute.new_ru_uniplanner_shared_Institute_qidr3p_k$(id, shortName, name, branchId);
    }
    copy(id, shortName, name, branchId, $super) {
      id = id === VOID ? this.id : id;
      shortName = shortName === VOID ? this.shortName : shortName;
      name = name === VOID ? this.name : name;
      branchId = branchId === VOID ? this.branchId : branchId;
      return $super === VOID ? this.copy_po9waz_k$(id, shortName, name, branchId) : $super.copy_po9waz_k$.call(this, id, shortName, name, branchId);
    }
    toString() {
      return 'Institute(id=' + this.id + ', shortName=' + this.shortName + ', name=' + this.name + ', branchId=' + this.branchId + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.shortName) | 0;
      result = imul(result, 31) + getStringHashCode(this.name) | 0;
      result = imul(result, 31) + this.branchId | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof Institute))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.shortName === other.shortName))
        return false;
      if (!(this.name === other.name))
        return false;
      if (!(this.branchId === other.branchId))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_Institute_38humx_k$(seen0, id, shortName, name, branchId, serializationConstructorMarker, $box) {
      Companion_getInstance_14();
      if (!(7 === (7 & seen0))) {
        throwMissingFieldException(seen0, 7, $serializer_getInstance_13().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.shortName = shortName;
      $this.name = name;
      if (0 === (seen0 & 8))
        $this.branchId = 1;
      else
        $this.branchId = branchId;
      return $this;
    }
  }
  class Companion_15 {
    static new_ru_uniplanner_shared_Specialty_Companion_8j1uaj_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_15 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_14();
    }
  }
  class $serializer_15 {
    static new_ru_uniplanner_shared_Specialty_$serializer_6t679j_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_14 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.Specialty', $this, 3);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('name', false);
      tmp0_serialDesc.addElement_5pzumi_k$('instituteId', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_6q0c2c_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.name);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 2, value.instituteId);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_6q0c2c_k$(encoder, value instanceof Specialty ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = 0;
      var tmp5_local1 = null;
      var tmp6_local2 = 0;
      var tmp7_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp7_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp7_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 2);
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
              tmp6_local2 = tmp7_input.decodeIntElement_941u6a_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp7_input.endStructure_1xqz0n_k$(tmp0_desc);
      return Specialty.new_ru_uniplanner_shared_Specialty_v62e4g_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [IntSerializer_getInstance(), StringSerializer_getInstance(), IntSerializer_getInstance()];
    }
  }
  class Specialty {
    constructor(id, name, instituteId) {
      return new.target.new_ru_uniplanner_shared_Specialty_zggd4q_k$(id, name, instituteId);
    }
    static new_ru_uniplanner_shared_Specialty_zggd4q_k$(id, name, instituteId, $box) {
      Companion_getInstance_15();
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      $this.instituteId = instituteId;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_name_woqyms_k$() {
      return this.name;
    }
    get_instituteId_sn849z_k$() {
      return this.instituteId;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.name;
    }
    component3_7eebsa_k$() {
      return this.instituteId;
    }
    copy_jqwgyn_k$(id, name, instituteId) {
      return Specialty.new_ru_uniplanner_shared_Specialty_zggd4q_k$(id, name, instituteId);
    }
    copy(id, name, instituteId, $super) {
      id = id === VOID ? this.id : id;
      name = name === VOID ? this.name : name;
      instituteId = instituteId === VOID ? this.instituteId : instituteId;
      return $super === VOID ? this.copy_jqwgyn_k$(id, name, instituteId) : $super.copy_jqwgyn_k$.call(this, id, name, instituteId);
    }
    toString() {
      return 'Specialty(id=' + this.id + ', name=' + this.name + ', instituteId=' + this.instituteId + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.name) | 0;
      result = imul(result, 31) + this.instituteId | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof Specialty))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.name === other.name))
        return false;
      if (!(this.instituteId === other.instituteId))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_Specialty_v62e4g_k$(seen0, id, name, instituteId, serializationConstructorMarker, $box) {
      Companion_getInstance_15();
      if (!(7 === (7 & seen0))) {
        throwMissingFieldException(seen0, 7, $serializer_getInstance_14().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      $this.instituteId = instituteId;
      return $this;
    }
  }
  class Companion_16 {
    static new_ru_uniplanner_shared_AcademicGroup_Companion_gtgi05_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_16 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_15();
    }
  }
  class $serializer_16 {
    static new_ru_uniplanner_shared_AcademicGroup_$serializer_rcav3_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_15 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.AcademicGroup', $this, 4);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('name', false);
      tmp0_serialDesc.addElement_5pzumi_k$('eduLevel', false);
      tmp0_serialDesc.addElement_5pzumi_k$('specialtyId', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_9tcxvy_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.name);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 2, value.eduLevel);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 3, value.specialtyId);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_9tcxvy_k$(encoder, value instanceof AcademicGroup ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = 0;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_local3 = 0;
      var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp8_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 3);
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
              tmp6_local2 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
      return AcademicGroup.new_ru_uniplanner_shared_AcademicGroup_m9mfrb_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), IntSerializer_getInstance()];
    }
  }
  class AcademicGroup {
    constructor(id, name, eduLevel, specialtyId) {
      return new.target.new_ru_uniplanner_shared_AcademicGroup_s3k37w_k$(id, name, eduLevel, specialtyId);
    }
    static new_ru_uniplanner_shared_AcademicGroup_s3k37w_k$(id, name, eduLevel, specialtyId, $box) {
      Companion_getInstance_16();
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      $this.eduLevel = eduLevel;
      $this.specialtyId = specialtyId;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_name_woqyms_k$() {
      return this.name;
    }
    get_eduLevel_89qrt_k$() {
      return this.eduLevel;
    }
    get_specialtyId_imvu8_k$() {
      return this.specialtyId;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.name;
    }
    component3_7eebsa_k$() {
      return this.eduLevel;
    }
    component4_7eebs9_k$() {
      return this.specialtyId;
    }
    copy_po9waz_k$(id, name, eduLevel, specialtyId) {
      return AcademicGroup.new_ru_uniplanner_shared_AcademicGroup_s3k37w_k$(id, name, eduLevel, specialtyId);
    }
    copy(id, name, eduLevel, specialtyId, $super) {
      id = id === VOID ? this.id : id;
      name = name === VOID ? this.name : name;
      eduLevel = eduLevel === VOID ? this.eduLevel : eduLevel;
      specialtyId = specialtyId === VOID ? this.specialtyId : specialtyId;
      return $super === VOID ? this.copy_po9waz_k$(id, name, eduLevel, specialtyId) : $super.copy_po9waz_k$.call(this, id, name, eduLevel, specialtyId);
    }
    toString() {
      return 'AcademicGroup(id=' + this.id + ', name=' + this.name + ', eduLevel=' + this.eduLevel + ', specialtyId=' + this.specialtyId + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.name) | 0;
      result = imul(result, 31) + getStringHashCode(this.eduLevel) | 0;
      result = imul(result, 31) + this.specialtyId | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof AcademicGroup))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.name === other.name))
        return false;
      if (!(this.eduLevel === other.eduLevel))
        return false;
      if (!(this.specialtyId === other.specialtyId))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_AcademicGroup_m9mfrb_k$(seen0, id, name, eduLevel, specialtyId, serializationConstructorMarker, $box) {
      Companion_getInstance_16();
      if (!(15 === (15 & seen0))) {
        throwMissingFieldException(seen0, 15, $serializer_getInstance_15().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      $this.eduLevel = eduLevel;
      $this.specialtyId = specialtyId;
      return $this;
    }
  }
  class Companion_17 {
    static new_ru_uniplanner_shared_Teacher_Companion_eypmlh_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_17 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_16();
    }
  }
  class $serializer_17 {
    static new_ru_uniplanner_shared_Teacher_$serializer_p0ze0b_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_16 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.Teacher', $this, 2);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('name', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_31bmbc_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !(value.name === '\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E')) {
        tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.name);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_31bmbc_k$(encoder, value instanceof Teacher ? value : THROW_CCE());
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
      return Teacher.new_ru_uniplanner_shared_Teacher_h26tuw_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
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
  class Teacher {
    constructor(id, name) {
      return new.target.new_ru_uniplanner_shared_Teacher_m27b95_k$(id, name);
    }
    static new_ru_uniplanner_shared_Teacher_m27b95_k$(id, name, $box) {
      Companion_getInstance_17();
      name = name === VOID ? '\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E' : name;
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_name_woqyms_k$() {
      return this.name;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.name;
    }
    copy_xhhsuv_k$(id, name) {
      return Teacher.new_ru_uniplanner_shared_Teacher_m27b95_k$(id, name);
    }
    copy(id, name, $super) {
      id = id === VOID ? this.id : id;
      name = name === VOID ? this.name : name;
      return $super === VOID ? this.copy_xhhsuv_k$(id, name) : $super.copy_xhhsuv_k$.call(this, id, name);
    }
    toString() {
      return 'Teacher(id=' + this.id + ', name=' + this.name + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.name) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof Teacher))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.name === other.name))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_Teacher_h26tuw_k$(seen0, id, name, serializationConstructorMarker, $box) {
      Companion_getInstance_17();
      if (!(1 === (1 & seen0))) {
        throwMissingFieldException(seen0, 1, $serializer_getInstance_16().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      if (0 === (seen0 & 2))
        $this.name = '\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E';
      else
        $this.name = name;
      return $this;
    }
  }
  class Companion_18 {
    static new_ru_uniplanner_shared_Room_Companion_aj6izt_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_18 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_17();
    }
  }
  class $serializer_18 {
    static new_ru_uniplanner_shared_Room_$serializer_klsk1a_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_17 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.Room', $this, 2);
      tmp0_serialDesc.addElement_5pzumi_k$('id', false);
      tmp0_serialDesc.addElement_5pzumi_k$('name', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_66zush_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 0, value.id);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 1, value.name);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_66zush_k$(encoder, value instanceof Room ? value : THROW_CCE());
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
      return Room.new_ru_uniplanner_shared_Room_8wkqcg_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
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
  class Room {
    constructor(id, name) {
      return new.target.new_ru_uniplanner_shared_Room_jpt99c_k$(id, name);
    }
    static new_ru_uniplanner_shared_Room_jpt99c_k$(id, name, $box) {
      Companion_getInstance_18();
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      return $this;
    }
    get_id_kntnx8_k$() {
      return this.id;
    }
    get_name_woqyms_k$() {
      return this.name;
    }
    component1_7eebsc_k$() {
      return this.id;
    }
    component2_7eebsb_k$() {
      return this.name;
    }
    copy_xhhsuv_k$(id, name) {
      return Room.new_ru_uniplanner_shared_Room_jpt99c_k$(id, name);
    }
    copy(id, name, $super) {
      id = id === VOID ? this.id : id;
      name = name === VOID ? this.name : name;
      return $super === VOID ? this.copy_xhhsuv_k$(id, name) : $super.copy_xhhsuv_k$.call(this, id, name);
    }
    toString() {
      return 'Room(id=' + this.id + ', name=' + this.name + ')';
    }
    hashCode() {
      var result = this.id;
      result = imul(result, 31) + getStringHashCode(this.name) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof Room))
        return false;
      if (!(this.id === other.id))
        return false;
      if (!(this.name === other.name))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_Room_8wkqcg_k$(seen0, id, name, serializationConstructorMarker, $box) {
      Companion_getInstance_18();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_17().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.id = id;
      $this.name = name;
      return $this;
    }
  }
  class Companion_19 {
    static new_ru_uniplanner_shared_ParserStatusResponse_Companion_beqi5l_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_19 = $this;
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_18();
    }
  }
  class $serializer_19 {
    static new_ru_uniplanner_shared_ParserStatusResponse_$serializer_oify43_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_18 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.ParserStatusResponse', $this, 4);
      tmp0_serialDesc.addElement_5pzumi_k$('status', false);
      tmp0_serialDesc.addElement_5pzumi_k$('lastUpdate', false);
      tmp0_serialDesc.addElement_5pzumi_k$('groupsCount', false);
      tmp0_serialDesc.addElement_5pzumi_k$('lessonsCount', false);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_inq6yy_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      tmp1_output.encodeStringElement_1n5wu2_k$(tmp0_desc, 0, value.status);
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, StringSerializer_getInstance(), value.lastUpdate);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 2, value.groupsCount);
      tmp1_output.encodeIntElement_krhhce_k$(tmp0_desc, 3, value.lessonsCount);
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_inq6yy_k$(encoder, value instanceof ParserStatusResponse ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_local2 = 0;
      var tmp7_local3 = 0;
      var tmp8_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      if (tmp8_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp8_input.decodeStringElement_3oenpg_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
        tmp7_local3 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 3);
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
              tmp5_local1 = tmp8_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            case 3:
              tmp7_local3 = tmp8_input.decodeIntElement_941u6a_k$(tmp0_desc, 3);
              tmp3_bitMask0 = tmp3_bitMask0 | 8;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp8_input.endStructure_1xqz0n_k$(tmp0_desc);
      return ParserStatusResponse.new_ru_uniplanner_shared_ParserStatusResponse_3ujn1n_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), IntSerializer_getInstance(), IntSerializer_getInstance()];
    }
  }
  class ParserStatusResponse {
    constructor(status, lastUpdate, groupsCount, lessonsCount) {
      return new.target.new_ru_uniplanner_shared_ParserStatusResponse_cg07bb_k$(status, lastUpdate, groupsCount, lessonsCount);
    }
    static new_ru_uniplanner_shared_ParserStatusResponse_cg07bb_k$(status, lastUpdate, groupsCount, lessonsCount, $box) {
      Companion_getInstance_19();
      var $this = createThis(this, $box);
      $this.status = status;
      $this.lastUpdate = lastUpdate;
      $this.groupsCount = groupsCount;
      $this.lessonsCount = lessonsCount;
      return $this;
    }
    get_status_jnf6d7_k$() {
      return this.status;
    }
    get_lastUpdate_cs99c8_k$() {
      return this.lastUpdate;
    }
    get_groupsCount_u6du4u_k$() {
      return this.groupsCount;
    }
    get_lessonsCount_3m3spv_k$() {
      return this.lessonsCount;
    }
    component1_7eebsc_k$() {
      return this.status;
    }
    component2_7eebsb_k$() {
      return this.lastUpdate;
    }
    component3_7eebsa_k$() {
      return this.groupsCount;
    }
    component4_7eebs9_k$() {
      return this.lessonsCount;
    }
    copy_o0r5wi_k$(status, lastUpdate, groupsCount, lessonsCount) {
      return ParserStatusResponse.new_ru_uniplanner_shared_ParserStatusResponse_cg07bb_k$(status, lastUpdate, groupsCount, lessonsCount);
    }
    copy(status, lastUpdate, groupsCount, lessonsCount, $super) {
      status = status === VOID ? this.status : status;
      lastUpdate = lastUpdate === VOID ? this.lastUpdate : lastUpdate;
      groupsCount = groupsCount === VOID ? this.groupsCount : groupsCount;
      lessonsCount = lessonsCount === VOID ? this.lessonsCount : lessonsCount;
      return $super === VOID ? this.copy_o0r5wi_k$(status, lastUpdate, groupsCount, lessonsCount) : $super.copy_o0r5wi_k$.call(this, status, lastUpdate, groupsCount, lessonsCount);
    }
    toString() {
      return 'ParserStatusResponse(status=' + this.status + ', lastUpdate=' + this.lastUpdate + ', groupsCount=' + this.groupsCount + ', lessonsCount=' + this.lessonsCount + ')';
    }
    hashCode() {
      var result = getStringHashCode(this.status);
      result = imul(result, 31) + (this.lastUpdate == null ? 0 : getStringHashCode(this.lastUpdate)) | 0;
      result = imul(result, 31) + this.groupsCount | 0;
      result = imul(result, 31) + this.lessonsCount | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof ParserStatusResponse))
        return false;
      if (!(this.status === other.status))
        return false;
      if (!(this.lastUpdate == other.lastUpdate))
        return false;
      if (!(this.groupsCount === other.groupsCount))
        return false;
      if (!(this.lessonsCount === other.lessonsCount))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_ParserStatusResponse_3ujn1n_k$(seen0, status, lastUpdate, groupsCount, lessonsCount, serializationConstructorMarker, $box) {
      Companion_getInstance_19();
      if (!(15 === (15 & seen0))) {
        throwMissingFieldException(seen0, 15, $serializer_getInstance_18().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.status = status;
      $this.lastUpdate = lastUpdate;
      $this.groupsCount = groupsCount;
      $this.lessonsCount = lessonsCount;
      return $this;
    }
  }
  class Companion_20 {
    static new_ru_uniplanner_shared_ParserSyncRequest_Companion_urfgl7_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_20 = $this;
      var tmp = $this;
      var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp.$childSerializers_1 = [null, null, lazy(tmp_0, ParserSyncRequest$Companion$$childSerializers$_anonymous__2jq9gr)];
      return $this;
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_19();
    }
  }
  class $serializer_20 {
    static new_ru_uniplanner_shared_ParserSyncRequest_$serializer_djafmm_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_19 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.ParserSyncRequest', $this, 3);
      tmp0_serialDesc.addElement_5pzumi_k$('startDate', false);
      tmp0_serialDesc.addElement_5pzumi_k$('endDate', false);
      tmp0_serialDesc.addElement_5pzumi_k$('groups', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_1yu9px_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      var tmp2_cached = Companion_getInstance_20().$childSerializers_1;
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 0, StringSerializer_getInstance(), value.startDate);
      tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 1, StringSerializer_getInstance(), value.endDate);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 2) ? true : !(value.groups == null)) {
        tmp1_output.encodeNullableSerializableElement_5lquiv_k$(tmp0_desc, 2, tmp2_cached[2].get_value_j01efc_k$(), value.groups);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_1yu9px_k$(encoder, value instanceof ParserSyncRequest ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = null;
      var tmp5_local1 = null;
      var tmp6_local2 = null;
      var tmp7_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      var tmp8_cached = Companion_getInstance_20().$childSerializers_1;
      if (tmp7_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
        tmp6_local2 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, tmp8_cached[2].get_value_j01efc_k$(), tmp6_local2);
        tmp3_bitMask0 = tmp3_bitMask0 | 4;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp7_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            case 2:
              tmp6_local2 = tmp7_input.decodeNullableSerializableElement_k2y6ab_k$(tmp0_desc, 2, tmp8_cached[2].get_value_j01efc_k$(), tmp6_local2);
              tmp3_bitMask0 = tmp3_bitMask0 | 4;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp7_input.endStructure_1xqz0n_k$(tmp0_desc);
      return ParserSyncRequest.new_ru_uniplanner_shared_ParserSyncRequest_hs0fea_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      var tmp0_cached = Companion_getInstance_20().$childSerializers_1;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(tmp0_cached[2].get_value_j01efc_k$())];
    }
  }
  class ParserSyncRequest {
    constructor(startDate, endDate, groups) {
      return new.target.new_ru_uniplanner_shared_ParserSyncRequest_2lynu6_k$(startDate, endDate, groups);
    }
    static new_ru_uniplanner_shared_ParserSyncRequest_2lynu6_k$(startDate, endDate, groups, $box) {
      Companion_getInstance_20();
      groups = groups === VOID ? null : groups;
      var $this = createThis(this, $box);
      $this.startDate = startDate;
      $this.endDate = endDate;
      $this.groups = groups;
      return $this;
    }
    get_startDate_qphqpl_k$() {
      return this.startDate;
    }
    get_endDate_pbn8ao_k$() {
      return this.endDate;
    }
    get_groups_dy12vx_k$() {
      return this.groups;
    }
    component1_7eebsc_k$() {
      return this.startDate;
    }
    component2_7eebsb_k$() {
      return this.endDate;
    }
    component3_7eebsa_k$() {
      return this.groups;
    }
    copy_mvs6wo_k$(startDate, endDate, groups) {
      return ParserSyncRequest.new_ru_uniplanner_shared_ParserSyncRequest_2lynu6_k$(startDate, endDate, groups);
    }
    copy(startDate, endDate, groups, $super) {
      startDate = startDate === VOID ? this.startDate : startDate;
      endDate = endDate === VOID ? this.endDate : endDate;
      groups = groups === VOID ? this.groups : groups;
      return $super === VOID ? this.copy_mvs6wo_k$(startDate, endDate, groups) : $super.copy_mvs6wo_k$.call(this, startDate, endDate, groups);
    }
    toString() {
      return 'ParserSyncRequest(startDate=' + this.startDate + ', endDate=' + this.endDate + ', groups=' + toString(this.groups) + ')';
    }
    hashCode() {
      var result = this.startDate == null ? 0 : getStringHashCode(this.startDate);
      result = imul(result, 31) + (this.endDate == null ? 0 : getStringHashCode(this.endDate)) | 0;
      result = imul(result, 31) + (this.groups == null ? 0 : hashCode(this.groups)) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof ParserSyncRequest))
        return false;
      if (!(this.startDate == other.startDate))
        return false;
      if (!(this.endDate == other.endDate))
        return false;
      if (!equals(this.groups, other.groups))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_ParserSyncRequest_hs0fea_k$(seen0, startDate, endDate, groups, serializationConstructorMarker, $box) {
      Companion_getInstance_20();
      if (!(3 === (3 & seen0))) {
        throwMissingFieldException(seen0, 3, $serializer_getInstance_19().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.startDate = startDate;
      $this.endDate = endDate;
      if (0 === (seen0 & 4))
        $this.groups = null;
      else
        $this.groups = groups;
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
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
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
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
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
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
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
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
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
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
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
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
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
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
    validateLesson(lesson) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (lesson.id < 0) {
        errors.add_utx5q5_k$('ID \u0437\u0430\u043D\u044F\u0442\u0438\u044F \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
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
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
    validateInstitute(institute) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (institute.id < 0) {
        errors.add_utx5q5_k$('ID \u0438\u043D\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435\u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      if (isBlank(institute.shortName)) {
        errors.add_utx5q5_k$('\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u043D\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (institute.shortName.length > 10) {
        errors.add_utx5q5_k$('\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u043D\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
      }
      if (isBlank(institute.name)) {
        errors.add_utx5q5_k$('\u041F\u043E\u043B\u043D\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u043D\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (institute.name.length > 100) {
        errors.add_utx5q5_k$('\u041F\u043E\u043B\u043D\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u043D\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 100 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
      }
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
    validateSpecialty(specialty) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (specialty.id < 0) {
        errors.add_utx5q5_k$('ID \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435\u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      if (isBlank(specialty.name)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (specialty.name.length > 100) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 100 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
      }
      if (specialty.instituteId < 0) {
        errors.add_utx5q5_k$('ID \u0438\u043D\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u0432 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435\u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
    validateAcademicGroup(group) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (group.id < 0) {
        errors.add_utx5q5_k$('ID \u0430\u043A\u0430\u0434\u0435\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u044B \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435\u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      if (isBlank(group.name)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u043A\u0430\u0434\u0435\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (group.name.length > 50) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u043A\u0430\u0434\u0435\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u044B \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
      }
      if (isBlank(group.eduLevel)) {
        errors.add_utx5q5_k$('\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (group.eduLevel.length > 50) {
        errors.add_utx5q5_k$('\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
      }
      if (group.specialtyId < 0) {
        errors.add_utx5q5_k$('ID \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0432 \u0430\u043A\u0430\u0434\u0435\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435\u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
    validateTeacher(teacher) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (teacher.id < 0) {
        errors.add_utx5q5_k$('ID \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435\u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      if (isBlank(teacher.name)) {
        errors.add_utx5q5_k$('\u0418\u043C\u044F \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (teacher.name.length > 100) {
        errors.add_utx5q5_k$('\u0418\u043C\u044F \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 100 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
      }
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
    validateRoom(room) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (room.id < 0) {
        errors.add_utx5q5_k$('ID \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435\u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      if (isBlank(room.name)) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C');
      }
      if (room.name.length > 50) {
        errors.add_utx5q5_k$('\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432');
      }
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
    validateParserStatusResponse(response) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (!isValidParserStatus(this, response.status)) {
        errors.add_utx5q5_k$('\u0421\u0442\u0430\u0442\u0443\u0441 \u043F\u0430\u0440\u0441\u0435\u0440\u0430 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043E\u0434\u043D\u0438\u043C \u0438\u0437: running, idle, error, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E: ' + response.status);
      }
      if (response.groupsCount < 0) {
        errors.add_utx5q5_k$('\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0433\u0440\u0443\u043F\u043F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      if (response.lessonsCount < 0) {
        errors.add_utx5q5_k$('\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C');
      }
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
    validateParserSyncRequest(request) {
      // Inline function 'kotlin.collections.mutableListOf' call
      var errors = ArrayList.new_kotlin_collections_ArrayList_h94ppk_k$();
      if (!(request.startDate == null) && !isValidDateFormat(this, request.startDate)) {
        errors.add_utx5q5_k$('\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0434\u0430\u0442\u044B \u043D\u0430\u0447\u0430\u043B\u0430: ' + request.startDate);
      }
      if (!(request.endDate == null) && !isValidDateFormat(this, request.endDate)) {
        errors.add_utx5q5_k$('\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0434\u0430\u0442\u044B \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F: ' + request.endDate);
      }
      if (!(request.startDate == null) && !(request.endDate == null) && compareTo(request.startDate, request.endDate) > 0) {
        errors.add_utx5q5_k$('\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u043E\u0437\u0436\u0435 \u0434\u0430\u0442\u044B \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F');
      }
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(errors.isEmpty_y1axqb_k$(), errors);
    }
  }
  class Companion_21 {
    static new_ru_uniplanner_shared_ValidationResult_Companion_u5acv5_k$($box) {
      var $this = createThis(this, $box);
      Companion_instance_21 = $this;
      var tmp = $this;
      var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp.$childSerializers_1 = [null, lazy(tmp_0, ValidationResult$Companion$$childSerializers$_anonymous__rihhys)];
      return $this;
    }
    valid() {
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(true, emptyList());
    }
    invalid(errors) {
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(false, errors);
    }
    serializer_9w0wvi_k$() {
      return $serializer_getInstance_20();
    }
  }
  class $serializer_21 {
    static new_ru_uniplanner_shared_ValidationResult_$serializer_4u00f5_k$($box) {
      var $this = createThis(this, $box);
      $serializer_instance_20 = $this;
      var tmp0_serialDesc = PluginGeneratedSerialDescriptor.new_kotlinx_serialization_internal_PluginGeneratedSerialDescriptor_x9evkg_k$('ru.uniplanner.shared.ValidationResult', $this, 2);
      tmp0_serialDesc.addElement_5pzumi_k$('isValid', false);
      tmp0_serialDesc.addElement_5pzumi_k$('errors', true);
      $this.descriptor_1 = tmp0_serialDesc;
      return $this;
    }
    serialize_n8bpd2_k$(encoder, value) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_output = encoder.beginStructure_yljocp_k$(tmp0_desc);
      var tmp2_cached = Companion_getInstance_21().$childSerializers_1;
      tmp1_output.encodeBooleanElement_ydht7q_k$(tmp0_desc, 0, value.isValid);
      if (tmp1_output.shouldEncodeElementDefault_x8eyid_k$(tmp0_desc, 1) ? true : !equals(value.errors, emptyList())) {
        tmp1_output.encodeSerializableElement_isqxcl_k$(tmp0_desc, 1, tmp2_cached[1].get_value_j01efc_k$(), value.errors);
      }
      tmp1_output.endStructure_1xqz0n_k$(tmp0_desc);
    }
    serialize_5ase3y_k$(encoder, value) {
      return this.serialize_n8bpd2_k$(encoder, value instanceof ValidationResult ? value : THROW_CCE());
    }
    deserialize_sy6x50_k$(decoder) {
      var tmp0_desc = this.descriptor_1;
      var tmp1_flag = true;
      var tmp2_index = 0;
      var tmp3_bitMask0 = 0;
      var tmp4_local0 = false;
      var tmp5_local1 = null;
      var tmp6_input = decoder.beginStructure_yljocp_k$(tmp0_desc);
      var tmp7_cached = Companion_getInstance_21().$childSerializers_1;
      if (tmp6_input.decodeSequentially_xlblqy_k$()) {
        tmp4_local0 = tmp6_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 0);
        tmp3_bitMask0 = tmp3_bitMask0 | 1;
        tmp5_local1 = tmp6_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 1, tmp7_cached[1].get_value_j01efc_k$(), tmp5_local1);
        tmp3_bitMask0 = tmp3_bitMask0 | 2;
      } else
        while (tmp1_flag) {
          tmp2_index = tmp6_input.decodeElementIndex_bstkhp_k$(tmp0_desc);
          switch (tmp2_index) {
            case -1:
              tmp1_flag = false;
              break;
            case 0:
              tmp4_local0 = tmp6_input.decodeBooleanElement_vuyhtj_k$(tmp0_desc, 0);
              tmp3_bitMask0 = tmp3_bitMask0 | 1;
              break;
            case 1:
              tmp5_local1 = tmp6_input.decodeSerializableElement_uahnnv_k$(tmp0_desc, 1, tmp7_cached[1].get_value_j01efc_k$(), tmp5_local1);
              tmp3_bitMask0 = tmp3_bitMask0 | 2;
              break;
            default:
              throw UnknownFieldException.new_kotlinx_serialization_UnknownFieldException_r32xsj_k$(tmp2_index);
          }
        }
      tmp6_input.endStructure_1xqz0n_k$(tmp0_desc);
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_gqb779_k$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
    }
    get_descriptor_wjt6a0_k$() {
      return this.descriptor_1;
    }
    childSerializers_5ghqw5_k$() {
      var tmp0_cached = Companion_getInstance_21().$childSerializers_1;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      return [BooleanSerializer_getInstance(), tmp0_cached[1].get_value_j01efc_k$()];
    }
  }
  class ValidationResult {
    constructor(isValid, errors) {
      return new.target.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(isValid, errors);
    }
    static new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(isValid, errors, $box) {
      Companion_getInstance_21();
      errors = errors === VOID ? emptyList() : errors;
      var $this = createThis(this, $box);
      $this.isValid = isValid;
      $this.errors = errors;
      return $this;
    }
    get_isValid_zh4f7b_k$() {
      return this.isValid;
    }
    get_errors_czzmno_k$() {
      return this.errors;
    }
    component1_7eebsc_k$() {
      return this.isValid;
    }
    component2_7eebsb_k$() {
      return this.errors;
    }
    copy_7ciw4y_k$(isValid, errors) {
      return ValidationResult.new_ru_uniplanner_shared_ValidationResult_ttj28g_k$(isValid, errors);
    }
    copy(isValid, errors, $super) {
      isValid = isValid === VOID ? this.isValid : isValid;
      errors = errors === VOID ? this.errors : errors;
      return $super === VOID ? this.copy_7ciw4y_k$(isValid, errors) : $super.copy_7ciw4y_k$.call(this, isValid, errors);
    }
    toString() {
      return 'ValidationResult(isValid=' + this.isValid + ', errors=' + toString_0(this.errors) + ')';
    }
    hashCode() {
      var result = getBooleanHashCode(this.isValid);
      result = imul(result, 31) + hashCode(this.errors) | 0;
      return result;
    }
    equals(other) {
      if (this === other)
        return true;
      if (!(other instanceof ValidationResult))
        return false;
      if (!(this.isValid === other.isValid))
        return false;
      if (!equals(this.errors, other.errors))
        return false;
      return true;
    }
    static new_ru_uniplanner_shared_ValidationResult_gqb779_k$(seen0, isValid, errors, serializationConstructorMarker, $box) {
      Companion_getInstance_21();
      if (!(1 === (1 & seen0))) {
        throwMissingFieldException(seen0, 1, $serializer_getInstance_20().descriptor_1);
      }
      var $this = createThis(this, $box);
      $this.isValid = isValid;
      if (0 === (seen0 & 2))
        $this.errors = emptyList();
      else
        $this.errors = errors;
      return $this;
    }
  }
  //endregion
  function get_API_BASE_URL() {
    return API_BASE_URL;
  }
  var API_BASE_URL;
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
      Companion_0.new_ru_uniplanner_shared_ScheduleParams_Companion_9632fn_k$();
    return Companion_instance_0;
  }
  var $serializer_instance;
  function $serializer_getInstance() {
    if ($serializer_instance === VOID)
      $serializer_0.new_ru_uniplanner_shared_ScheduleParams_$serializer_1vvzfw_k$();
    return $serializer_instance;
  }
  var Companion_instance_1;
  function Companion_getInstance_1() {
    if (Companion_instance_1 === VOID)
      Companion_1.new_ru_uniplanner_shared_TaskUpdateParams_Companion_jf8nvp_k$();
    return Companion_instance_1;
  }
  var $serializer_instance_0;
  function $serializer_getInstance_0() {
    if ($serializer_instance_0 === VOID)
      $serializer_1.new_ru_uniplanner_shared_TaskUpdateParams_$serializer_o1xol5_k$();
    return $serializer_instance_0;
  }
  function _get_$childSerializers__r2zwns($this) {
    return $this.$childSerializers_1;
  }
  function ParserSyncParams$Companion$$childSerializers$_anonymous__9jxsiy() {
    return ArrayListSerializer.new_kotlinx_serialization_internal_ArrayListSerializer_7a6935_k$(StringSerializer_getInstance());
  }
  var Companion_instance_2;
  function Companion_getInstance_2() {
    if (Companion_instance_2 === VOID)
      Companion_2.new_ru_uniplanner_shared_ParserSyncParams_Companion_fw0pyr_k$();
    return Companion_instance_2;
  }
  var $serializer_instance_1;
  function $serializer_getInstance_1() {
    if ($serializer_instance_1 === VOID)
      $serializer_2.new_ru_uniplanner_shared_ParserSyncParams_$serializer_mhxghv_k$();
    return $serializer_instance_1;
  }
  var Companion_instance_3;
  function Companion_getInstance_3() {
    if (Companion_instance_3 === VOID)
      Companion_3.new_ru_uniplanner_shared_ErrorResponse_Companion_subrut_k$();
    return Companion_instance_3;
  }
  var $serializer_instance_2;
  function $serializer_getInstance_2() {
    if ($serializer_instance_2 === VOID)
      $serializer_3.new_ru_uniplanner_shared_ErrorResponse_$serializer_mpoasy_k$();
    return $serializer_instance_2;
  }
  var Companion_instance_4;
  function Companion_getInstance_4() {
    if (Companion_instance_4 === VOID)
      Companion_4.new_ru_uniplanner_shared_User_Companion_tndc3b_k$();
    return Companion_instance_4;
  }
  var $serializer_instance_3;
  function $serializer_getInstance_3() {
    if ($serializer_instance_3 === VOID)
      $serializer_4.new_ru_uniplanner_shared_User_$serializer_gagiiq_k$();
    return $serializer_instance_3;
  }
  var Companion_instance_5;
  function Companion_getInstance_5() {
    if (Companion_instance_5 === VOID)
      Companion_5.new_ru_uniplanner_shared_RegisterRequest_Companion_cot3s5_k$();
    return Companion_instance_5;
  }
  var $serializer_instance_4;
  function $serializer_getInstance_4() {
    if ($serializer_instance_4 === VOID)
      $serializer_5.new_ru_uniplanner_shared_RegisterRequest_$serializer_wj2f63_k$();
    return $serializer_instance_4;
  }
  var Companion_instance_6;
  function Companion_getInstance_6() {
    if (Companion_instance_6 === VOID)
      Companion_6.new_ru_uniplanner_shared_LoginRequest_Companion_1gv41t_k$();
    return Companion_instance_6;
  }
  var $serializer_instance_5;
  function $serializer_getInstance_5() {
    if ($serializer_instance_5 === VOID)
      $serializer_6.new_ru_uniplanner_shared_LoginRequest_$serializer_oeqmcv_k$();
    return $serializer_instance_5;
  }
  var Companion_instance_7;
  function Companion_getInstance_7() {
    if (Companion_instance_7 === VOID)
      Companion_7.new_ru_uniplanner_shared_LoginResponse_Companion_uwl4dh_k$();
    return Companion_instance_7;
  }
  var $serializer_instance_6;
  function $serializer_getInstance_6() {
    if ($serializer_instance_6 === VOID)
      $serializer_7.new_ru_uniplanner_shared_LoginResponse_$serializer_ype9d9_k$();
    return $serializer_instance_6;
  }
  var Companion_instance_8;
  function Companion_getInstance_8() {
    if (Companion_instance_8 === VOID)
      Companion_8.new_ru_uniplanner_shared_Task_Companion_fcuw3h_k$();
    return Companion_instance_8;
  }
  var $serializer_instance_7;
  function $serializer_getInstance_7() {
    if ($serializer_instance_7 === VOID)
      $serializer_8.new_ru_uniplanner_shared_Task_$serializer_wsnrv8_k$();
    return $serializer_instance_7;
  }
  var Companion_instance_9;
  function Companion_getInstance_9() {
    if (Companion_instance_9 === VOID)
      Companion_9.new_ru_uniplanner_shared_TaskInput_Companion_da6fd1_k$();
    return Companion_instance_9;
  }
  var $serializer_instance_8;
  function $serializer_getInstance_8() {
    if ($serializer_instance_8 === VOID)
      $serializer_9.new_ru_uniplanner_shared_TaskInput_$serializer_y50ovm_k$();
    return $serializer_instance_8;
  }
  var Companion_instance_10;
  function Companion_getInstance_10() {
    if (Companion_instance_10 === VOID)
      Companion_10.new_ru_uniplanner_shared_Note_Companion_4mi1j_k$();
    return Companion_instance_10;
  }
  var $serializer_instance_9;
  function $serializer_getInstance_9() {
    if ($serializer_instance_9 === VOID)
      $serializer_10.new_ru_uniplanner_shared_Note_$serializer_xvbhkd_k$();
    return $serializer_instance_9;
  }
  var Companion_instance_11;
  function Companion_getInstance_11() {
    if (Companion_instance_11 === VOID)
      Companion_11.new_ru_uniplanner_shared_NoteInput_Companion_da7tet_k$();
    return Companion_instance_11;
  }
  var $serializer_instance_10;
  function $serializer_getInstance_10() {
    if ($serializer_instance_10 === VOID)
      $serializer_11.new_ru_uniplanner_shared_NoteInput_$serializer_q6n0w1_k$();
    return $serializer_instance_10;
  }
  var Companion_instance_12;
  function Companion_getInstance_12() {
    if (Companion_instance_12 === VOID)
      Companion_12.new_ru_uniplanner_shared_Lesson_Companion_okg23n_k$();
    return Companion_instance_12;
  }
  var $serializer_instance_11;
  function $serializer_getInstance_11() {
    if ($serializer_instance_11 === VOID)
      $serializer_12.new_ru_uniplanner_shared_Lesson_$serializer_8cinq3_k$();
    return $serializer_instance_11;
  }
  var Companion_instance_13;
  function Companion_getInstance_13() {
    if (Companion_instance_13 === VOID)
      Companion_13.new_ru_uniplanner_shared_GroupInfo_Companion_qd8jlx_k$();
    return Companion_instance_13;
  }
  var $serializer_instance_12;
  function $serializer_getInstance_12() {
    if ($serializer_instance_12 === VOID)
      $serializer_13.new_ru_uniplanner_shared_GroupInfo_$serializer_6366xi_k$();
    return $serializer_instance_12;
  }
  var Companion_instance_14;
  function Companion_getInstance_14() {
    if (Companion_instance_14 === VOID)
      Companion_14.new_ru_uniplanner_shared_Institute_Companion_im8tdn_k$();
    return Companion_instance_14;
  }
  var $serializer_instance_13;
  function $serializer_getInstance_13() {
    if ($serializer_instance_13 === VOID)
      $serializer_14.new_ru_uniplanner_shared_Institute_$serializer_a2034u_k$();
    return $serializer_instance_13;
  }
  var Companion_instance_15;
  function Companion_getInstance_15() {
    if (Companion_instance_15 === VOID)
      Companion_15.new_ru_uniplanner_shared_Specialty_Companion_8j1uaj_k$();
    return Companion_instance_15;
  }
  var $serializer_instance_14;
  function $serializer_getInstance_14() {
    if ($serializer_instance_14 === VOID)
      $serializer_15.new_ru_uniplanner_shared_Specialty_$serializer_6t679j_k$();
    return $serializer_instance_14;
  }
  var Companion_instance_16;
  function Companion_getInstance_16() {
    if (Companion_instance_16 === VOID)
      Companion_16.new_ru_uniplanner_shared_AcademicGroup_Companion_gtgi05_k$();
    return Companion_instance_16;
  }
  var $serializer_instance_15;
  function $serializer_getInstance_15() {
    if ($serializer_instance_15 === VOID)
      $serializer_16.new_ru_uniplanner_shared_AcademicGroup_$serializer_rcav3_k$();
    return $serializer_instance_15;
  }
  var Companion_instance_17;
  function Companion_getInstance_17() {
    if (Companion_instance_17 === VOID)
      Companion_17.new_ru_uniplanner_shared_Teacher_Companion_eypmlh_k$();
    return Companion_instance_17;
  }
  var $serializer_instance_16;
  function $serializer_getInstance_16() {
    if ($serializer_instance_16 === VOID)
      $serializer_17.new_ru_uniplanner_shared_Teacher_$serializer_p0ze0b_k$();
    return $serializer_instance_16;
  }
  var Companion_instance_18;
  function Companion_getInstance_18() {
    if (Companion_instance_18 === VOID)
      Companion_18.new_ru_uniplanner_shared_Room_Companion_aj6izt_k$();
    return Companion_instance_18;
  }
  var $serializer_instance_17;
  function $serializer_getInstance_17() {
    if ($serializer_instance_17 === VOID)
      $serializer_18.new_ru_uniplanner_shared_Room_$serializer_klsk1a_k$();
    return $serializer_instance_17;
  }
  var Companion_instance_19;
  function Companion_getInstance_19() {
    if (Companion_instance_19 === VOID)
      Companion_19.new_ru_uniplanner_shared_ParserStatusResponse_Companion_beqi5l_k$();
    return Companion_instance_19;
  }
  var $serializer_instance_18;
  function $serializer_getInstance_18() {
    if ($serializer_instance_18 === VOID)
      $serializer_19.new_ru_uniplanner_shared_ParserStatusResponse_$serializer_oify43_k$();
    return $serializer_instance_18;
  }
  function _get_$childSerializers__r2zwns_0($this) {
    return $this.$childSerializers_1;
  }
  function ParserSyncRequest$Companion$$childSerializers$_anonymous__2jq9gr() {
    return ArrayListSerializer.new_kotlinx_serialization_internal_ArrayListSerializer_7a6935_k$(StringSerializer_getInstance());
  }
  var Companion_instance_20;
  function Companion_getInstance_20() {
    if (Companion_instance_20 === VOID)
      Companion_20.new_ru_uniplanner_shared_ParserSyncRequest_Companion_urfgl7_k$();
    return Companion_instance_20;
  }
  var $serializer_instance_19;
  function $serializer_getInstance_19() {
    if ($serializer_instance_19 === VOID)
      $serializer_20.new_ru_uniplanner_shared_ParserSyncRequest_$serializer_djafmm_k$();
    return $serializer_instance_19;
  }
  function isValidParserStatus($this, status) {
    var tmp = listOf(['running', 'idle', 'error']);
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = status.toLowerCase();
    return tmp.contains_aljjnj_k$(tmp$ret$1);
  }
  function isValidDateFormat($this, date) {
    var dateRegex = Regex.new_kotlin_text_Regex_w1xv3y_k$('^\\d{4}-\\d{2}-\\d{2}$');
    return dateRegex.matches_evli6i_k$(date);
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
  function _get_$childSerializers__r2zwns_1($this) {
    return $this.$childSerializers_1;
  }
  function ValidationResult$Companion$$childSerializers$_anonymous__rihhys() {
    return ArrayListSerializer.new_kotlinx_serialization_internal_ArrayListSerializer_7a6935_k$(StringSerializer_getInstance());
  }
  var Companion_instance_21;
  function Companion_getInstance_21() {
    if (Companion_instance_21 === VOID)
      Companion_21.new_ru_uniplanner_shared_ValidationResult_Companion_u5acv5_k$();
    return Companion_instance_21;
  }
  var $serializer_instance_20;
  function $serializer_getInstance_20() {
    if ($serializer_instance_20 === VOID)
      $serializer_21.new_ru_uniplanner_shared_ValidationResult_$serializer_4u00f5_k$();
    return $serializer_instance_20;
  }
  function requireValid(_this__u8e3s4) {
    if (!_this__u8e3s4.isValid) {
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_f8t9r5_k$('\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u0438: ' + joinToString(_this__u8e3s4.errors, ', '));
    }
  }
  //region block: post-declaration
  initMetadataForObject(ApiConstants, 'ApiConstants');
  initMetadataForCompanion(Companion, VOID, [SerializerFactory]);
  initMetadataForClass($serializer, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ApiResponse, 'ApiResponse', ApiResponse.new_ru_uniplanner_shared_ApiResponse_y5eog7_k$, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: Companion_getInstance});
  initMetadataForCompanion(Companion_0);
  protoOf($serializer_0).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_0, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ScheduleParams, 'ScheduleParams', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance});
  initMetadataForCompanion(Companion_1);
  protoOf($serializer_1).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_1, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(TaskUpdateParams, 'TaskUpdateParams', TaskUpdateParams.new_ru_uniplanner_shared_TaskUpdateParams_dzyyqp_k$, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_0});
  initMetadataForCompanion(Companion_2);
  protoOf($serializer_2).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_2, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ParserSyncParams, 'ParserSyncParams', ParserSyncParams.new_ru_uniplanner_shared_ParserSyncParams_2yur14_k$, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_1});
  initMetadataForCompanion(Companion_3);
  protoOf($serializer_3).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_3, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ErrorResponse, 'ErrorResponse', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_2});
  initMetadataForCompanion(Companion_4);
  protoOf($serializer_4).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_4, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(User, 'User', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_3});
  initMetadataForCompanion(Companion_5);
  protoOf($serializer_5).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_5, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(RegisterRequest, 'RegisterRequest', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_4});
  initMetadataForCompanion(Companion_6);
  protoOf($serializer_6).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_6, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(LoginRequest, 'LoginRequest', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_5});
  initMetadataForCompanion(Companion_7);
  protoOf($serializer_7).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_7, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(LoginResponse, 'LoginResponse', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_6});
  initMetadataForCompanion(Companion_8);
  protoOf($serializer_8).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_8, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Task, 'Task', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_7});
  initMetadataForCompanion(Companion_9);
  protoOf($serializer_9).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_9, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(TaskInput, 'TaskInput', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_8});
  initMetadataForCompanion(Companion_10);
  protoOf($serializer_10).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_10, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Note, 'Note', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_9});
  initMetadataForCompanion(Companion_11);
  protoOf($serializer_11).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_11, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(NoteInput, 'NoteInput', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_10});
  initMetadataForCompanion(Companion_12);
  protoOf($serializer_12).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_12, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Lesson, 'Lesson', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_11});
  initMetadataForCompanion(Companion_13);
  protoOf($serializer_13).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_13, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(GroupInfo, 'GroupInfo', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_12});
  initMetadataForCompanion(Companion_14);
  protoOf($serializer_14).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_14, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Institute, 'Institute', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_13});
  initMetadataForCompanion(Companion_15);
  protoOf($serializer_15).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_15, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Specialty, 'Specialty', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_14});
  initMetadataForCompanion(Companion_16);
  protoOf($serializer_16).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_16, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(AcademicGroup, 'AcademicGroup', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_15});
  initMetadataForCompanion(Companion_17);
  protoOf($serializer_17).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_17, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Teacher, 'Teacher', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_16});
  initMetadataForCompanion(Companion_18);
  protoOf($serializer_18).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_18, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Room, 'Room', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_17});
  initMetadataForCompanion(Companion_19);
  protoOf($serializer_19).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_19, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ParserStatusResponse, 'ParserStatusResponse', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_18});
  initMetadataForCompanion(Companion_20);
  protoOf($serializer_20).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_20, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ParserSyncRequest, 'ParserSyncRequest', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_19});
  initMetadataForObject(ModelValidators, 'ModelValidators');
  initMetadataForCompanion(Companion_21);
  protoOf($serializer_21).typeParametersSerializers_fr94fx_k$ = typeParametersSerializers;
  initMetadataForObject($serializer_21, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ValidationResult, 'ValidationResult', VOID, VOID, VOID, VOID, VOID, {[getAssociatedObjectId(SerializableWith)]: $serializer_getInstance_20});
  //endregion
  //region block: init
  API_BASE_URL = 'http://localhost:8080/api/v1';
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
    $ru$uniplanner$shared.ParserSyncParams = ParserSyncParams;
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
    $ru$uniplanner$shared.Institute = Institute;
    $ru$uniplanner$shared.Specialty = Specialty;
    $ru$uniplanner$shared.AcademicGroup = AcademicGroup;
    $ru$uniplanner$shared.Teacher = Teacher;
    $ru$uniplanner$shared.Room = Room;
    $ru$uniplanner$shared.ParserStatusResponse = ParserStatusResponse;
    $ru$uniplanner$shared.ParserSyncRequest = ParserSyncRequest;
    var $ru = _.ru || (_.ru = {});
    var $ru$uniplanner = $ru.uniplanner || ($ru.uniplanner = {});
    var $ru$uniplanner$shared = $ru$uniplanner.shared || ($ru$uniplanner.shared = {});
    defineProp($ru$uniplanner$shared, 'ModelValidators', ModelValidators_getInstance, VOID, true);
    $ru$uniplanner$shared.ValidationResult = ValidationResult;
    defineProp($ru$uniplanner$shared.ValidationResult, 'Companion', Companion_getInstance_21, VOID, true);
  }
  $jsExportAll$(_);
  kotlin_kotlin.$jsExportAll$(_);
  //endregion
  return _;
}(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js')));

//# sourceMappingURL=shared.js.map
