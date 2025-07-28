<template>
  <div class="nurse">
    <div style="text-align: right; line-height: 50px; margin: 5px 35px">
      <a-button
        style="border-radius: 16px"
        type="primary"
        :disabled="submitBtn"
        @click="handleSubmit"
        >保存
      </a-button>
    </div>
    <div class="right-bg" v-if="this.patientInfo.operationId">
      <div class="patientEeceipt">
        <a-form-model
          style="position: relative"
          @submit="handleSubmit"
          :form="form"
        >
          <a-tabs style="padding: 0 20px" @change="callback" type="card">
            <a-tab-pane tab="术前交接" key="1">
              <div class="white-bg">
                <!-- <div class="top-line"></div> -->
                <a-row class="row-white">
                  <a-col :span="12">
                    <a-form-model-item
                      label=" 1.患者手腕带信息正确:与病历一致:"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a01">
                        <a-radio value="1">是</a-radio>
                        <a-radio value="0">否</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="12">
                    <a-form-model-item
                      label="输液通道:"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a02">
                        <a-radio value="0">通畅</a-radio>
                        <a-radio value="1">其他</a-radio>
                      </a-radio-group>
                      <a-input
                        v-if="form.sshl_szrm_handover_a02 == '1'"
                        placeholder="请输入"
                        :max-length="200"
                        v-model="form.sshl_szrm_handover_a03"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="12">
                    <a-form-model-item
                      label="血制品："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a04">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>

                      <template v-if="form.sshl_szrm_handover_a04 == '1'">
                        <a-checkbox
                          v-model="checkBox.sshl_szrm_handover_a05"
                          @change="onChange($event, 'sshl_szrm_handover_a05')"
                          >正在输注
                        </a-checkbox>
                        <a-checkbox
                          v-model="checkBox.sshl_szrm_handover_a06"
                          @change="onChange($event, 'sshl_szrm_handover_a06')"
                          >带入恢复室
                        </a-checkbox>
                        <a-checkbox
                          v-model="checkBox.sshl_szrm_handover_a07"
                          @change="onChange($event, 'sshl_szrm_handover_a07')"
                          >带入病房
                        </a-checkbox>
                        种类/量
                        <a-input
                          placeholder="请输入"
                          :max-length="200"
                          v-model="form.sshl_szrm_handover_a08"
                        />
                        <a-input
                          placeholder="请输入"
                          :max-length="200"
                          v-model="form.sshl_szrm_handover_a09"
                        />
                      </template>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="12">
                    <a-form-model-item
                      label="尿管："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a10">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="12">
                    <a-form-model-item
                      label="胃管："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a11">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="12">
                    <a-form-model-item
                      label="引流管："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a12">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>

                      <template v-if="form.sshl_szrm_handover_a12 == '1'">
                        数量：
                        <a-input
                          placeholder="请输入"
                          :max-length="200"
                          v-model="form.sshl_szrm_handover_a13"
                        />
                        条

                        <a-checkbox
                          v-model="checkBox.sshl_szrm_handover_a14"
                          @change="onChange($event, 'sshl_szrm_handover_a14')"
                          >已贴标识
                        </a-checkbox>
                      </template>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="12">
                    <a-form-model-item
                      label="全身皮肤情况："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a15">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="12">
                    <a-form-model-item
                      label="手术护理记录单："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a16">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="12">
                    <a-form-model-item
                      label="手术物品清点记录单："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a17">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="12">
                    <a-form-model-item
                      label="影像学资料："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a18">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>

                      <template v-if="form.sshl_szrm_handover_a18 == '1'">
                        <a-checkbox
                          v-model="checkBox.sshl_szrm_handover_a19"
                          @change="onChange($event, 'sshl_szrm_handover_a19')"
                          >X片
                        </a-checkbox>
                        <a-checkbox
                          v-model="checkBox.sshl_szrm_handover_a20"
                          @change="onChange($event, 'sshl_szrm_handover_a20')"
                          >CT
                        </a-checkbox>
                        <a-checkbox
                          v-model="checkBox.sshl_szrm_handover_a21"
                          @change="onChange($event, 'sshl_szrm_handover_a21')"
                          >MRI
                        </a-checkbox>
                      </template>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="12">
                    <a-form-model-item
                      label="术中带药："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a22">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>

                      <template v-if="form.sshl_szrm_handover_a22 == '1'">
                        药物名称及量
                        <a-input
                          placeholder="请输入"
                          :max-length="200"
                          v-model="form.sshl_szrm_handover_a23"
                        />
                      </template>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="12">
                    <a-form-model-item
                      label="带回术中用物："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a24">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>

                      <template v-if="form.sshl_szrm_handover_a24 == '1'">
                        药物名称及量
                        <a-input
                          placeholder="请输入"
                          :max-length="200"
                          v-model="form.sshl_szrm_handover_a25"
                        />
                      </template>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="12">
                    <a-form-model-item
                      label="四级手术首次转运手术医师陪同："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.sshl_szrm_handover_a26">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>

                      手术医师签字：
                      <a-input
                        placeholder="请输入"
                        :max-length="200"
                        v-model="form.sshl_szrm_handover_a26"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="12">
                    <a-form-model-item
                      label="专科特殊情况及其他："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-input
                        placeholder="请输入"
                        :max-length="200"
                        v-model="form.sshl_szrm_handover_a27"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
              </div>
              <a-row
                style="margin-left: 0; margin-right: 0; margin-top: 12px"
                class="white-bg"
                :gutter="24"
              >
                <a-col :md="12" :lg="12">
                  <a-form-model-item
                    label="交接日期："
                    :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    :required="false"
                    help
                  >
                    <a-date-picker
                      @panelChange="handlePanelChange"
                      :mode="mode"
                      style="width: 150px"
                      format="YYYY-MM-DD HH:mm"
                      v-model="form.sshl_szrm_handover_a28"
                      :show-time="{ format: 'HH:mm' }"
                      @openChange="handleOpenChange1"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24"></a-col>
                <a-col :md="12" :lg="12">
                  <a-form-model-item
                    label="手术室护士签名："
                    :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    :required="false"
                    help
                  >
                    <a-input
                      v-model="form.ho_a019"
                      style="width: 200px"
                      :max-length="50"
                      placeholder
                    />

                    时间:
                    <a-date-picker
                      @panelChange="handlePanelChange"
                      :mode="mode"
                      style="width: 150px"
                      format="YYYY-MM-DD HH:mm"
                      v-model="form.sshl_szrm_handover_a29"
                      :show-time="{ format: 'HH:mm' }"
                      @openChange="handleOpenChange1"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24"></a-col>

                <a-col :md="12" :lg="12">
                  <a-form-model-item
                    label="恢复室护士签名："
                    :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    :required="false"
                    help
                  >
                    <a-input
                      v-model="form.ho_a019"
                      style="width: 200px"
                      :max-length="50"
                      placeholder
                    />

                    时间:
                    <a-date-picker
                      @panelChange="handlePanelChange"
                      :mode="mode"
                      style="width: 150px"
                      format="YYYY-MM-DD HH:mm"
                      v-model="form.sshl_szrm_handover_a30"
                      :show-time="{ format: 'HH:mm' }"
                      @openChange="handleOpenChange1"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24"></a-col>

                <a-col :md="12" :lg="12">
                  <a-form-model-item
                    label="恢复室补充交接："
                    :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    :required="false"
                    help
                  >
                    <a-input
                      v-model="form.sshl_szrm_handover_a31"
                      style="width: 200px"
                      :max-length="50"
                      placeholder
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="24"></a-col>

                <a-col :md="12" :lg="12">
                  <a-form-model-item
                    label="病房护士签名："
                    :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    :required="false"
                    help
                  >
                    <a-input
                      v-model="form.ho_a019"
                      style="width: 200px"
                      :max-length="50"
                      placeholder
                    />

                    时间:
                    <a-date-picker
                      @panelChange="handlePanelChange"
                      :mode="mode"
                      style="width: 150px"
                      format="YYYY-MM-DD HH:mm"
                      v-model="form.sshl_szrm_handover_a32"
                      :show-time="{ format: 'HH:mm' }"
                      @openChange="handleOpenChange1"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane tab="术后交接(恢复室)" key="2">
              <div class="white-bg">
                <!-- <div class="top-line"></div> -->
                <a-row class="row-white">
                  <a-col :span="8">
                    <a-form-model-item
                      label="交接时间："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-date-picker
                        :show-time="{ format: 'HH:mm' }"
                        @openChange="handleOpenChange"
                        @panelChange="handlePanelChange"
                        :mode="mode"
                        format="YYYY-MM-DD HH:mm"
                        v-model="time.ho_b001"
                        @change="(value) => handleChange(value, 'ho_b001')"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="8">
                    <a-form-model-item
                      label="液体："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_b002">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col style="line-height: 40px" :span="16">
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_b003')"
                      v-model="check.ho_b003"
                      >标识</a-checkbox
                    >
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_b004')"
                      v-model="check.ho_b004"
                      >通畅</a-checkbox
                    >
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_b005')"
                      v-model="check.ho_b005"
                      >部位已查
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="8">
                    <a-form-model-item
                      label="尿管："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_b006">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col style="line-height: 40px" :span="16">
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_b007')"
                      v-model="check.ho_b007"
                      >标识</a-checkbox
                    >
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_b008')"
                      v-model="check.ho_b008"
                      >通畅</a-checkbox
                    >
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_b009')"
                      v-model="check.ho_b009"
                      >部位已查
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="8">
                    <a-form-model-item
                      label="引流管："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_b010">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col style="line-height: 40px" :span="16">
                    <span style="margin-right: 2%; color: #00adab"
                      >部位已查个数</span
                    >
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_b011.visible"
                    >
                      <a-input-number
                        style="width: 100px"
                        placeholder="请输入"
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_b011')
                        "
                        v-model="form.ho_b011"
                      />
                    </a-tooltip>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="8">
                    <a-form-model-item
                      label="带回血液制品："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_b012">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col
                    style="line-height: 40px; margin-left: 13.5%"
                    :span="21"
                  >
                    <span style="margin-right: 1%; color: #00adab">血浆</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_b013.visible"
                    >
                      <a-input-number
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_b013')
                        "
                        style="width: 100px"
                        v-model="form.ho_b013"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >U</span
                    >
                    <span style="margin-right: 1%; color: #00adab">自体血</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_b014.visible"
                    >
                      <a-input-number
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_b014')
                        "
                        style="width: 100px"
                        v-model="form.ho_b014"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >ml</span
                    >
                    <span style="margin-right: 1%; color: #00adab">红细胞</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_b015.visible"
                    >
                      <a-input-number
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_b015')
                        "
                        style="width: 100px"
                        v-model="form.ho_b015"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >U</span
                    >
                    <span style="margin-right: 1%; color: #00adab">血小板</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_b016.visible"
                    >
                      <a-input-number
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_b016')
                        "
                        style="width: 100px"
                        v-model="form.ho_b016"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >U</span
                    >
                    <span style="margin-right: 1%; color: #00adab">冷沉淀</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_b017.visible"
                    >
                      <a-input-number
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_b017')
                        "
                        style="width: 100px"
                        v-model="form.ho_b017"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >U</span
                    >
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="24">
                    <a-form-model-item
                      label="患者衣服："
                      :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      :required="false"
                      help
                    >
                      <a-tooltip
                        :title="mytitle"
                        :destroyTooltipOnHide="true"
                        :visible="formVisible.ho_b018.visible"
                      >
                        <a-input-number
                          placeholder="请输入"
                          @change="
                            (value) => changeOpenPopconfirm(value, 'ho_b018')
                          "
                          v-model="form.ho_b018"
                        />
                      </a-tooltip>
                      <span style="margin-left: 5px">件</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="24">
                    <a-form-model-item
                      label="影像资料："
                      :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      :required="false"
                      help
                    >
                      <a-tooltip
                        :title="mytitle"
                        :destroyTooltipOnHide="true"
                        :visible="formVisible.ho_b019.visible"
                      >
                        <a-input-number
                          placeholder="请输入"
                          @change="
                            (value) => changeOpenPopconfirm(value, 'ho_b019')
                          "
                          v-model="form.ho_b019"
                        />
                      </a-tooltip>
                      <span style="margin-left: 5px">张</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="8">
                    <a-form-model-item
                      label="皮肤："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_b020">
                        <a-radio value="1">好</a-radio>
                        <a-radio value="0">异常</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="16">
                    <a-form-model-item
                      label
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 24 }, sm: { span: 24 } }"
                      :required="false"
                      help
                    >
                      <a-input
                        placeholder="请输入"
                        :max-length="200"
                        v-model="form.ho_b021"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="8">
                    <a-form-model-item
                      label="特殊物品："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_b022">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="16">
                    <a-form-model-item
                      label
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 24 }, sm: { span: 24 } }"
                      :required="false"
                      help
                    >
                      <a-input
                        placeholder="请输入"
                        :max-length="200"
                        v-model="form.ho_b023"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="24">
                    <a-form-model-item
                      label="特殊情况说明："
                      :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                      :wrapperCol="{ lg: { span: 21 }, sm: { span: 21 } }"
                      :required="false"
                      help
                    >
                      <a-textarea
                        :max-length="2000"
                        style="margin-top: 8px"
                        :rows="8"
                        placeholder="请输入"
                        v-model="form.ho_b027"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
              </div>
              <a-row
                style="margin-left: 0; margin-right: 0; margin-top: 12px"
                class="white-bg"
                :gutter="24"
              >
                <a-col :md="6" :lg="6">
                  <a-form-model-item
                    label="手术室护士："
                    :labelCol="{ lg: { span: 8 }, sm: { span: 12 } }"
                    :wrapperCol="{ lg: { span: 16 }, sm: { span: 12 } }"
                    :required="false"
                    help
                  >
                    <a-input
                      v-model="form.ho_b024"
                      :max-length="50"
                      placeholder
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :md="6" :lg="6">
                  <a-form-model-item
                    label="恢复室护士："
                    :labelCol="{ lg: { span: 8 }, sm: { span: 12 } }"
                    :wrapperCol="{ lg: { span: 16 }, sm: { span: 12 } }"
                    :required="false"
                    help
                  >
                    <a-input
                      v-model="form.ho_b025"
                      :max-length="50"
                      placeholder
                    />
                  </a-form-model-item>
                </a-col>
                <!-- <a-col :md="6" :lg="6">
                  <a-form-model-item
                    label="病房护士："
                    :labelCol="{lg: {span: 8}, sm: {span: 12}}"
                    :wrapperCol="{lg: {span: 16}, sm: {span: 12} }"
                    :required="false"
                    help
                  >
                    <a-input v-model="form.ho_b026" :max-length="50" placeholder />
                  </a-form-model-item>
                </a-col> -->
              </a-row>
            </a-tab-pane>
            <a-tab-pane tab="术后交接(病房)" key="3">
              <div class="white-bg">
                <!-- <div class="top-line"></div> -->
                <a-row class="row-white">
                  <a-col :span="8">
                    <a-form-model-item
                      label="交接时间："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-date-picker
                        :show-time="{ format: 'HH:mm' }"
                        @openChange="handleOpenChange"
                        @panelChange="handlePanelChange"
                        :mode="mode"
                        format="YYYY-MM-DD HH:mm"
                        v-model="time.ho_c001"
                        @change="(value) => handleChange(value, 'ho_c001')"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="8">
                    <a-form-model-item
                      label="液体："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_c002">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col style="line-height: 40px" :span="16">
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_c003')"
                      v-model="check.ho_c003"
                      >标识</a-checkbox
                    >
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_c004')"
                      v-model="check.ho_c004"
                      >通畅</a-checkbox
                    >
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_c005')"
                      v-model="check.ho_c005"
                      >部位已查
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="8">
                    <a-form-model-item
                      label="尿管："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_c006">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col style="line-height: 40px" :span="16">
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_c007')"
                      v-model="check.ho_c007"
                      >标识</a-checkbox
                    >
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_c008')"
                      v-model="check.ho_c008"
                      >通畅</a-checkbox
                    >
                    <a-checkbox
                      @change="(value) => onChange(value, 'ho_c009')"
                      v-model="check.ho_c009"
                      >部位已查
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="8">
                    <a-form-model-item
                      label="引流管："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_c010">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col style="line-height: 40px" :span="16">
                    <span style="margin-right: 2%; color: #00adab"
                      >部位已查个数</span
                    >
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_c011.visible"
                    >
                      <a-input-number
                        style="width: 100px"
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_c011')
                        "
                        v-model="form.ho_c011"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="8">
                    <a-form-model-item
                      label="带回血液制品："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_c012">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col
                    style="line-height: 40px; margin-left: 13.5%"
                    :span="21"
                  >
                    <span style="margin-right: 1%; color: #00adab">血浆</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_c013.visible"
                    >
                      <a-input-number
                        style="width: 100px"
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_c013')
                        "
                        v-model="form.ho_c013"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >ml</span
                    >
                    <span style="margin-right: 1%; color: #00adab">自体血</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_c014.visible"
                    >
                      <a-input-number
                        style="width: 100px"
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_c014')
                        "
                        v-model="form.ho_c014"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >U</span
                    >
                    <span style="margin-right: 1%; color: #00adab">红细胞</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_c015.visible"
                    >
                      <a-input-number
                        style="width: 100px"
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_c015')
                        "
                        v-model="form.ho_c015"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >U</span
                    >
                    <span style="margin-right: 1%; color: #00adab">血小板</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_c016.visible"
                    >
                      <a-input-number
                        style="width: 100px"
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_c016')
                        "
                        v-model="form.ho_c016"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >U</span
                    >
                    <span style="margin-right: 1%; color: #00adab">冷沉凝</span>
                    <a-tooltip
                      :title="mytitle"
                      :destroyTooltipOnHide="true"
                      :visible="formVisible.ho_c017.visible"
                    >
                      <a-input-number
                        style="width: 100px"
                        @change="
                          (value) => changeOpenPopconfirm(value, 'ho_c017')
                        "
                        v-model="form.ho_c017"
                        placeholder="请输入"
                      />
                    </a-tooltip>
                    <span
                      style="margin-right: 1%; color: #00adab; margin-left: 5px"
                      >U</span
                    >
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="24">
                    <a-form-model-item
                      label="患者衣服："
                      :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                      :wrapperCol="{ lg: { span: 21 }, sm: { span: 31 } }"
                      :required="false"
                      help
                    >
                      <a-tooltip
                        :title="mytitle"
                        :destroyTooltipOnHide="true"
                        :visible="formVisible.ho_c018.visible"
                      >
                        <a-input-number
                          placeholder="请输入"
                          @change="
                            (value) => changeOpenPopconfirm(value, 'ho_c018')
                          "
                          v-model="form.ho_c018"
                        />
                      </a-tooltip>
                      <span style="margin-left: 5px">件</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="24">
                    <a-form-model-item
                      label="影像资料："
                      :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                      :wrapperCol="{ lg: { span: 21 }, sm: { span: 21 } }"
                      :required="false"
                      help
                    >
                      <a-tooltip
                        :title="mytitle"
                        :destroyTooltipOnHide="true"
                        :visible="formVisible.ho_c019.visible"
                      >
                        <a-input-number
                          placeholder="请输入"
                          @change="
                            (value) => changeOpenPopconfirm(value, 'ho_c019')
                          "
                          v-model="form.ho_c019"
                        />
                      </a-tooltip>
                      <span style="margin-left: 5px">张</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="8">
                    <a-form-model-item
                      label="皮肤："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_c020">
                        <a-radio value="1">好</a-radio>
                        <a-radio value="0">异常</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="16">
                    <a-form-model-item
                      label
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 24 }, sm: { span: 24 } }"
                      :required="false"
                      help
                    >
                      <a-input
                        placeholder="请输入"
                        :max-length="200"
                        v-model="form.ho_c021"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-gray">
                  <a-col :span="8">
                    <a-form-model-item
                      label="特殊物品："
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      :required="false"
                      help
                    >
                      <a-radio-group v-model="form.ho_c022">
                        <a-radio value="1">有</a-radio>
                        <a-radio value="0">无</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="16">
                    <a-form-model-item
                      label
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 24 }, sm: { span: 24 } }"
                      :required="false"
                      help
                    >
                      <a-input
                        placeholder="请输入"
                        :max-length="200"
                        v-model="form.ho_c023"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row class="row-white">
                  <a-col :span="24">
                    <a-form-model-item
                      label="特殊情况说明："
                      :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                      :wrapperCol="{ lg: { span: 21 }, sm: { span: 21 } }"
                      :required="false"
                      help
                    >
                      <a-textarea
                        :max-length="1000"
                        style="margin-top: 8px"
                        :rows="8"
                        placeholder="请输入"
                        v-model="form.ho_c027"
                      />
                    </a-form-model-item>
                  </a-col>
                </a-row>
              </div>
              <a-row
                style="margin-left: 0; margin-right: 0; margin-top: 12px"
                class="white-bg"
                :gutter="24"
              >
                <a-col :md="6" :lg="6">
                  <a-form-model-item
                    label="恢复室护士："
                    :labelCol="{ lg: { span: 8 }, sm: { span: 12 } }"
                    :wrapperCol="{ lg: { span: 16 }, sm: { span: 12 } }"
                    :required="false"
                    help
                  >
                    <a-input
                      v-model="form.ho_c025"
                      :max-length="50"
                      placeholder
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :md="6" :lg="6">
                  <a-form-model-item
                    label="病房护士："
                    :labelCol="{ lg: { span: 8 }, sm: { span: 12 } }"
                    :wrapperCol="{ lg: { span: 16 }, sm: { span: 12 } }"
                    :required="false"
                    help
                  >
                    <a-input
                      v-model="form.ho_c026"
                      :max-length="50"
                      placeholder
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </a-form-model>
      </div>
    </div>
    <div class="right-bg2" v-else>
      <img src="~@/assets/change.png" style="width: 30%" />
    </div>
  </div>
</template>
<script>
import { printHtml } from "@/utils/print";
import {
  getFormQuery2,
  getFormRecord,
  getFormArchive,
  getReview,
} from "@/api/nurse";
import moment from "moment";

export default {
  name: "",
  components: {},
  props: {
    patientInfo: {
      type: Object,
      default: () => ({}),
    },
    Item: {
      type: Object,
      default: () => ({}),
    },
    deptCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      mode: "time",
      form: {},
      formObject: {},
      mytitle: "",
      checkBox: {},
      formVisible: {
        ho_a012: { visible: false },
        ho_a012: { visible: false },
        ho_a013: { visible: false },
        ho_b011: { visible: false },
        ho_b013: { visible: false },
        ho_b014: { visible: false },
        ho_b015: { visible: false },
        ho_b016: { visible: false },
        ho_b017: { visible: false },
        ho_b018: { visible: false },
        ho_b019: { visible: false },
        ho_c011: { visible: false },
        ho_c013: { visible: false },
        ho_c014: { visible: false },
        ho_c015: { visible: false },
        ho_c016: { visible: false },
        ho_c017: { visible: false },
        ho_c018: { visible: false },
        ho_c019: { visible: false },
      },
      time: {
        ho_a001: null, // moment('2019-12-31 09:09:20', 'YYYY-MM-DD h:mm:ss')
        ho_b001: null,
        ho_c001: null,
      },
      check: {},
      activeKey: "",
      submitBtn: false,
      count: 0, //计数
      datas: {},
      mytype: 0, //校验是否更改表单用
    };
  },
  watch: {
    form: {
      handler: function (newV, oldV) {
        if (this.mytype == 1) {
          for (const i in newV) {
            if (newV[i] !== this.datas[i]) {
              // 通过count判断数据改变
              this.count++;
              break;
            }
          }
        }
      },
      deep: true, // 里面的deep设为了true，这样的话，如果修改了这个form中的任何一个属性，都会执行handler这个方法
    },
  },
  created() {
    this.handleQuery();
  },
  methods: {
    moment,
    // 日期面板打开处理
    handleOpenChange1(open) {
      if (open) {
        this.mode = "time";
      }
    },
    //change中最大最小值范围限制
    changeOpenPopconfirm(value, param) {
      if (this.formObject[param]) {
        if (
          this.formObject[param].fieldValidMin &&
          this.formObject[param].fieldValidMax
        )
          if (
            (typeof value == "number" &&
              value < this.formObject[param].fieldValidMin) ||
            value > this.formObject[param].fieldValidMax
          ) {
            this.form[param] = "";
            this.mytitle =
              "请输入合理数值 " +
              this.formObject[param].fieldValidMin +
              "-" +
              this.formObject[param].fieldValidMax;
            this.formVisible[param].visible = true;
            this.setTimer(param);
          }
      }
    },
    setTimer(param) {
      if (this.formVisible[param].visible == true) {
        this.timer = setTimeout(() => {
          this.formVisible[param].visible = false;
        }, 2000);
      }
    },
    handleQuery() {
      this.submitBtn = true;
      const { $message } = this;
      // 查询前重置表单
      this.handleReset();
      if (this.patientInfo.operationId == "") {
        return;
      }
      getFormQuery2({
        businessId: this.patientInfo.operationId,
        recordType: "20",
        recordNo: 1, // 默认第一次记录单
      })
        .then((res) => {
          // console.log(12222)
          if (res.code === 200) {
            this.mytype = parseInt(1);
            if (!res.data) {
              return;
            }
            // 判断是否有文书 0 -- 没有 / 1 -- 有
            if (res.data.status === "0") {
              return;
            }
            var oldForm = {};
            var newDefaultForm = {};
            this.formObject = Object.assign(
              this.formObject,
              res.data.recordData,
            );
            oldForm = res.data.recordData;
            newDefaultForm = res.data.recordData;
            this.handleFormChange(oldForm, newDefaultForm);
            this.form = res.data.recordData;
            if (this.form.ho_a001) {
              this.time.ho_a001 = moment(
                this.form.ho_a001,
                "YYYY-MM-DD HH:mm:ss",
              );
            }
            if (this.form.ho_b001) {
              this.time.ho_b001 = moment(
                this.form.ho_b001,
                "YYYY-MM-DD HH:mm:ss",
              );
            }
            if (this.form.ho_c001) {
              this.time.ho_c001 = moment(
                this.form.ho_c001,
                "YYYY-MM-DD HH:mm:ss",
              );
            }
            this.check.ho_b003 = this.form.ho_b003 == "1" ? true : false;
            this.check.ho_b004 = this.form.ho_b004 == "1" ? true : false;
            this.check.ho_b005 = this.form.ho_b005 == "1" ? true : false;
            this.check.ho_b007 = this.form.ho_b007 == "1" ? true : false;
            this.check.ho_b008 = this.form.ho_b008 == "1" ? true : false;
            this.check.ho_b009 = this.form.ho_b009 == "1" ? true : false;
            this.check.ho_c003 = this.form.ho_c003 == "1" ? true : false;
            this.check.ho_c004 = this.form.ho_c004 == "1" ? true : false;
            this.check.ho_c005 = this.form.ho_c005 == "1" ? true : false;
            this.check.ho_c007 = this.form.ho_c007 == "1" ? true : false;
            this.check.ho_c008 = this.form.ho_c008 == "1" ? true : false;
            this.check.ho_c009 = this.form.ho_c009 == "1" ? true : false;
            this.datas = Object.assign(this.datas, this.form);
            this.count = 0;
          } else {
            $message.error(res.msg);
          }
        })
        .catch((err) => {
          $message.error(`load err: ${err.message}`);
        })
        .finally(() => {
          this.submitBtn = false;
        });
    },
    handleFormChange(oldForm, newDefaultForm) {
      for (var key in oldForm) {
        newDefaultForm[key] = oldForm[key].fieldDefault;
      }
      this.form = newDefaultForm;
    },
    handleSubmit(e) {
      e.preventDefault();
      const { $message } = this;
      if (this.patientInfo.operationId == "") {
        return;
      }
      this.submitBtn = true;
      const obj = {
        businessId: this.patientInfo.operationId,
        recordType: "20",
        data: this.form,
      };
      getFormRecord(obj)
        .then((res) => {
          if (res.code === 200) {
            $message.success(res.msg);
            this.mytype = 0;
            this.count = 0;
            this.handleQuery();
          } else {
            $message.error(res.msg);
          }
        })
        .catch((err) => {
          $message.error(`load err: ${err.message}`);
        })
        .finally(() => {
          this.submitBtn = false;
        });
    },
    // 弹出html
    showModal() {
      const { $message } = this;
      if (this.patientInfo.operationId == "") {
        return;
      }
      getReview({
        businessId: this.patientInfo.operationId,
        recordType: "20",
        recordNo: 1,
      })
        .then((res) => {
          printHtml(res.msg, "患者交接单", 1);
        })
        .catch((err) => {
          $message.error(`load err: ${err.message}`);
        });
    },
    // 归档
    handleArchive() {
      const { $message } = this;
      if (this.patientInfo.operationId == "") {
        return;
      }
      getFormArchive({
        businessId: this.patientInfo.operationId,
        recordType: "20",
      })
        .then((res) => {
          if (res.code === 200) {
            $message.success(res.msg);
          } else {
            $message.error(res.msg);
          }
        })
        .catch((err) => {
          $message.error(`load err: ${err.message}`);
        });
    },
    onChange(e, param) {
      if (e.target.checked === true) {
        this.form[param] = "1";
      } else {
        this.form[param] = "0";
      }
    },
    callback(key) {
      // console.log(key)
    },
    // 弹出日历和关闭日历的回调
    handleOpenChange(open) {
      if (open) {
        this.mode = "time";
      }
    },
    // 日期面板变化时的回调
    handlePanelChange(value, mode) {
      this.mode = mode;
    },
    handleChange(value, item) {
      if (value == null) {
        this.form[item] = "";
      } else {
        this.form[item] = value.format("YYYY-MM-DD HH:mm:ss");
      }
    },
    handleReset() {
      this.formObject = {};
      (this.form = {
        ho_b003: "",
        ho_b004: "",
        ho_b005: "",
        ho_b007: "",
        ho_b008: "",
        ho_b009: "",
        ho_c003: "",
        ho_c004: "",
        ho_c005: "",
        ho_c007: "",
        ho_c008: "",
        ho_c009: "",
      }),
        (this.time = {
          ho_a001: null,
          ho_b001: null,
          ho_c001: null,
        });
      this.check = {
        ho_b003: false,
        ho_b004: false,
        ho_b005: false,
        ho_b007: false,
        ho_b008: false,
        ho_b009: false,
        ho_c003: false,
        ho_c004: false,
        ho_c005: false,
        ho_c007: false,
        ho_c008: false,
        ho_c009: false,
      };
    },
  },
};
</script>
<style scoped>
.right-bg {
  background: #f6ffff;
  box-shadow: 0 4px 10px 0 rgba(0, 172, 172, 0.2);
  border-radius: 42px 42px 5px 5px;
  border-radius: 42px 42px 5px 5px;
  min-height: calc(100vh - 110px);
}

.right-bg2 {
  background: #f6ffff;
  box-shadow: 0 4px 10px 0 rgba(0, 172, 172, 0.2);
  border-radius: 42px 42px 5px 5px;
  border-radius: 42px 42px 5px 5px;
  min-height: calc(100vh - 110px);
  text-align: center;
  margin: 0 auto;
  line-height: calc(100vh - 110px);
}

.top-line {
  background: #d9d9d9;
  height: 4px;
  width: 100%;
  border-radius: 2px;
}

.active {
  background: #5cdbd3;
}

.row-white {
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 16px;
}

.row-gray {
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid #d9d9d9;
  padding: 0 16px;
}

/* 单选item之间选项间距 */
.ant-radio-wrapper {
  margin-top: 0px;
  /* 无效 */
  margin-right: 8px;
  margin-bottom: 0px;
  /* 选项item之间的距离 */
  margin-left: 12.5px;
}

/* 多选item之间选项间距格式 */
.ant-checkbox-wrapper {
  margin-left: 20px;
}

/* 时间输入框内容对齐 */
.ant-calendar-picker {
  margin-left: 12.5px;
}

/* 数字输入框内容格式对齐 */
.ant-input-number {
  margin-left: 12.5px;
}

/* 文本输入框内容格式对齐 */
.ant-input {
  margin-left: 12.5px;
}
</style>
<style>
.patientEeceipt .white-bg {
  background: #fff;
  box-shadow: 0 4px 10px 0 rgba(37, 38, 94, 0.1);
  border-radius: 5px;
}

.patientEeceipt .ant-form-item-label {
  text-align: left;
}

.patientEeceipt .ant-form-item {
  margin-bottom: 5px;
}
</style>
