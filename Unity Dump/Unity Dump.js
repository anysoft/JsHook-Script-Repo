(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("frida-il2cpp-bridge");

const e = require("./main");

setImmediate(e.start);

}).call(this)}).call(this,require("timers").setImmediate)

},{"./main":2,"frida-il2cpp-bridge":3,"timers":5}],2:[function(require,module,exports){
"use strict";

function e() {
  Il2Cpp.perform((() => {
    try {
      console.log("unity version:" + Il2Cpp.unityVersion), console.log("dump start"), 
      Il2Cpp.dump("dump.cs", "data/user/0/" + runtime.packageName);
    } catch (e) {
      console.log(e);
    }
  }));
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.start = void 0, exports.start = e;

},{}],3:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

var e, t, n = this && this.__decorate || function(e, t, n, i) {
  var r, s = arguments.length, a = s < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, i); else for (var l = e.length - 1; l >= 0; l--) (r = e[l]) && (a = (s < 3 ? r(a) : s > 3 ? r(t, n, a) : r(t, n)) || a);
  return s > 3 && a && Object.defineProperty(t, n, a), a;
};

function i(e) {
  const t = new Error(`[0m${e}`);
  throw t.name = "[0m[38;5;9mil2cpp[0m", t.stack = t.stack?.replace("Error", t.name)?.replace(/\n    at (.+) \((.+):(.+)\)/, "[3m[2m")?.concat("[0m"), 
  t;
}

function r(e) {
  globalThis.console.log(`[38;5;11mil2cpp[0m: ${e}`);
}

function s(e) {
  globalThis.console.log(`[38;5;10mil2cpp[0m: ${e}`);
}

function a(e) {
  globalThis.console.log(`[38;5;12mil2cpp[0m: ${e}`);
}

function l(e, t, n, i) {
  globalThis.Object.defineProperty(e, t, i?.(e, t, {
    get: n,
    configurable: !0
  }) ?? {
    get: n
  });
}

function o(e, t, n) {
  const i = n.get;
  if (!i) throw new Error("@lazy can only be applied to getter accessors");
  return n.get = function() {
    const e = i.call(this);
    return Object.defineProperty(this, t, {
      value: e,
      configurable: n.configurable,
      enumerable: n.enumerable,
      writable: !1
    }), e;
  }, n;
}

class c {
  handle;
  constructor(e) {
    e instanceof NativePointer ? this.handle = e : this.handle = e.handle;
  }
  equals(e) {
    return this.handle.equals(e.handle);
  }
  isNull() {
    return this.handle.isNull();
  }
}

class p extends c {
  constructor(e) {
    if (super(e), e.isNull()) throw new Error(`Handle for "${this.constructor.name}" cannot be NULL.`);
  }
}

class u {
  stringEncoding;
  address;
  constructor(e, t, n) {
    this.stringEncoding = n, this.address = Module.findExportByName(e, t) ?? NULL;
  }
  static get targets() {
    const [t, ...n] = function() {
      switch (Process.platform) {
       case "linux":
        try {
          return e.gte(Java.androidVersion, "12") ? [ null, [ "__loader_dlopen", "utf8" ] ] : [ "libdl.so", [ "dlopen", "utf8" ], [ "android_dlopen_ext", "utf8" ] ];
        } catch (e) {
          return [ null, [ "dlopen", "utf8" ] ];
        }

       case "darwin":
        return [ "libdyld.dylib", [ "dlopen", "utf8" ] ];

       case "windows":
        const t = "LoadLibrary";
        return [ "kernel32.dll", [ `${t}W`, "utf16" ], [ `${t}ExW`, "utf16" ], [ `${t}A`, "ansi" ], [ `${t}ExA`, "ansi" ] ];
      }
    }();
    return n.map((([e, n]) => new u(t, e, n))).filter((e => !e.address.isNull()));
  }
  readString(e) {
    switch (this.stringEncoding) {
     case "utf8":
      return e.readUtf8String();

     case "utf16":
      return e.readUtf16String();

     case "ansi":
      return e.readAnsiString();
    }
  }
}

function d(...e) {
  return new Promise((t => {
    for (const n of e) {
      if (null != Process.findModuleByName(n)) return void t(n);
    }
    const n = u.targets.map((i => Interceptor.attach(i.address, {
      onEnter(e) {
        this.modulePath = i.readString(e[0]) ?? "";
      },
      onLeave(i) {
        if (!i.isNull()) for (const i of e) this.modulePath.endsWith(i) && (setImmediate((() => n.forEach((e => e.detach())))), 
        t(i));
      }
    })));
  }));
}

function h(e) {
  const t = [], n = Memory.alloc(Process.pointerSize);
  let i = e(n);
  for (;!i.isNull(); ) t.push(i), i = e(n);
  return t;
}

function _(e) {
  const t = Memory.alloc(Process.pointerSize), n = e(t);
  if (n.isNull()) return [];
  const i = new Array(t.readInt());
  for (let e = 0; e < i.length; e++) i[e] = n.add(e * Process.pointerSize).readPointer();
  return i;
}

function m(e) {
  return new Proxy(e, {
    cache: new Map,
    construct(e, t) {
      const n = t[0].toUInt32();
      return this.cache.has(n) || this.cache.set(n, new e(t[0])), this.cache.get(n);
    }
  });
}

!function(e) {
  const t = /(20\d{2}|\d)\.(\d)\.(\d{1,2})(?:[abcfp]|rc){0,2}\d?/;
  function n(e, n) {
    const i = e.match(t), r = n.match(t);
    for (let e = 1; e <= 3; e++) {
      const t = Number(i?.[e] ?? -1), n = Number(r?.[e] ?? -1);
      if (t > n) return 1;
      if (t < n) return -1;
    }
    return 0;
  }
  e.find = function(e) {
    return e?.match(t)?.[0];
  }, e.gte = function(e, t) {
    return n(e, t) >= 0;
  }, e.lt = function(e, t) {
    return n(e, t) < 0;
  };
}(e || (e = {})), function(e) {
  class t {
    constructor() {}
    static get alloc() {
      return this.r("il2cpp_alloc", "pointer", [ "size_t" ]);
    }
    static get arrayGetElements() {
      return this.r("il2cpp_array_get_elements", "pointer", [ "pointer" ]);
    }
    static get arrayGetLength() {
      return this.r("il2cpp_array_length", "uint32", [ "pointer" ]);
    }
    static get arrayNew() {
      return this.r("il2cpp_array_new", "pointer", [ "pointer", "uint32" ]);
    }
    static get assemblyGetImage() {
      return this.r("il2cpp_assembly_get_image", "pointer", [ "pointer" ]);
    }
    static get classForEach() {
      return this.r("il2cpp_class_for_each", "void", [ "pointer", "pointer" ]);
    }
    static get classFromName() {
      return this.r("il2cpp_class_from_name", "pointer", [ "pointer", "pointer", "pointer" ]);
    }
    static get classFromSystemType() {
      return this.r("il2cpp_class_from_system_type", "pointer", [ "pointer" ]);
    }
    static get classFromType() {
      return this.r("il2cpp_class_from_type", "pointer", [ "pointer" ]);
    }
    static get classGetActualInstanceSize() {
      return this.r("il2cpp_class_get_actual_instance_size", "int32", [ "pointer" ]);
    }
    static get classGetArrayClass() {
      return this.r("il2cpp_array_class_get", "pointer", [ "pointer", "uint32" ]);
    }
    static get classGetArrayElementSize() {
      return this.r("il2cpp_class_array_element_size", "int", [ "pointer" ]);
    }
    static get classGetAssemblyName() {
      return this.r("il2cpp_class_get_assemblyname", "pointer", [ "pointer" ]);
    }
    static get classGetBaseType() {
      return this.r("il2cpp_class_enum_basetype", "pointer", [ "pointer" ]);
    }
    static get classGetDeclaringType() {
      return this.r("il2cpp_class_get_declaring_type", "pointer", [ "pointer" ]);
    }
    static get classGetElementClass() {
      return this.r("il2cpp_class_get_element_class", "pointer", [ "pointer" ]);
    }
    static get classGetFieldFromName() {
      return this.r("il2cpp_class_get_field_from_name", "pointer", [ "pointer", "pointer" ]);
    }
    static get classGetFields() {
      return this.r("il2cpp_class_get_fields", "pointer", [ "pointer", "pointer" ]);
    }
    static get classGetFlags() {
      return this.r("il2cpp_class_get_flags", "int", [ "pointer" ]);
    }
    static get classGetImage() {
      return this.r("il2cpp_class_get_image", "pointer", [ "pointer" ]);
    }
    static get classGetInstanceSize() {
      return this.r("il2cpp_class_instance_size", "int32", [ "pointer" ]);
    }
    static get classGetInterfaces() {
      return this.r("il2cpp_class_get_interfaces", "pointer", [ "pointer", "pointer" ]);
    }
    static get classGetMethodFromName() {
      return this.r("il2cpp_class_get_method_from_name", "pointer", [ "pointer", "pointer", "int" ]);
    }
    static get classGetMethods() {
      return this.r("il2cpp_class_get_methods", "pointer", [ "pointer", "pointer" ]);
    }
    static get classGetName() {
      return this.r("il2cpp_class_get_name", "pointer", [ "pointer" ]);
    }
    static get classGetNamespace() {
      return this.r("il2cpp_class_get_namespace", "pointer", [ "pointer" ]);
    }
    static get classGetNestedClasses() {
      return this.r("il2cpp_class_get_nested_types", "pointer", [ "pointer", "pointer" ]);
    }
    static get classGetParent() {
      return this.r("il2cpp_class_get_parent", "pointer", [ "pointer" ]);
    }
    static get classGetRank() {
      return this.r("il2cpp_class_get_rank", "int", [ "pointer" ]);
    }
    static get classGetStaticFieldData() {
      return this.r("il2cpp_class_get_static_field_data", "pointer", [ "pointer" ]);
    }
    static get classGetValueSize() {
      return this.r("il2cpp_class_value_size", "int32", [ "pointer", "pointer" ]);
    }
    static get classGetType() {
      return this.r("il2cpp_class_get_type", "pointer", [ "pointer" ]);
    }
    static get classHasReferences() {
      return this.r("il2cpp_class_has_references", "bool", [ "pointer" ]);
    }
    static get classInit() {
      return this.r("il2cpp_runtime_class_init", "void", [ "pointer" ]);
    }
    static get classIsAbstract() {
      return this.r("il2cpp_class_is_abstract", "bool", [ "pointer" ]);
    }
    static get classIsAssignableFrom() {
      return this.r("il2cpp_class_is_assignable_from", "bool", [ "pointer", "pointer" ]);
    }
    static get classIsBlittable() {
      return this.r("il2cpp_class_is_blittable", "bool", [ "pointer" ]);
    }
    static get classIsEnum() {
      return this.r("il2cpp_class_is_enum", "bool", [ "pointer" ]);
    }
    static get classIsGeneric() {
      return this.r("il2cpp_class_is_generic", "bool", [ "pointer" ]);
    }
    static get classIsInflated() {
      return this.r("il2cpp_class_is_inflated", "bool", [ "pointer" ]);
    }
    static get classIsInterface() {
      return this.r("il2cpp_class_is_interface", "bool", [ "pointer" ]);
    }
    static get classIsSubclassOf() {
      return this.r("il2cpp_class_is_subclass_of", "bool", [ "pointer", "pointer", "bool" ]);
    }
    static get classIsValueType() {
      return this.r("il2cpp_class_is_valuetype", "bool", [ "pointer" ]);
    }
    static get domainAssemblyOpen() {
      return this.r("il2cpp_domain_assembly_open", "pointer", [ "pointer", "pointer" ]);
    }
    static get domainGet() {
      return this.r("il2cpp_domain_get", "pointer", []);
    }
    static get domainGetAssemblies() {
      return this.r("il2cpp_domain_get_assemblies", "pointer", [ "pointer", "pointer" ]);
    }
    static get domainGetObject() {
      return this.r("il2cpp_domain_get_object", "pointer", []);
    }
    static get fieldGetModifier() {
      return this.r("il2cpp_field_get_modifier", "pointer", [ "pointer" ]);
    }
    static get fieldGetClass() {
      return this.r("il2cpp_field_get_parent", "pointer", [ "pointer" ]);
    }
    static get fieldGetFlags() {
      return this.r("il2cpp_field_get_flags", "int", [ "pointer" ]);
    }
    static get fieldGetName() {
      return this.r("il2cpp_field_get_name", "pointer", [ "pointer" ]);
    }
    static get fieldGetOffset() {
      return this.r("il2cpp_field_get_offset", "int32", [ "pointer" ]);
    }
    static get fieldGetStaticValue() {
      return this.r("il2cpp_field_static_get_value", "void", [ "pointer", "pointer" ]);
    }
    static get fieldGetType() {
      return this.r("il2cpp_field_get_type", "pointer", [ "pointer" ]);
    }
    static get fieldIsLiteral() {
      return this.r("il2cpp_field_is_literal", "bool", [ "pointer" ]);
    }
    static get fieldIsStatic() {
      return this.r("il2cpp_field_is_static", "bool", [ "pointer" ]);
    }
    static get fieldIsThreadStatic() {
      return this.r("il2cpp_field_is_thread_static", "bool", [ "pointer" ]);
    }
    static get fieldSetStaticValue() {
      return this.r("il2cpp_field_static_set_value", "void", [ "pointer", "pointer" ]);
    }
    static get free() {
      return this.r("il2cpp_free", "void", [ "pointer" ]);
    }
    static get gcCollect() {
      return this.r("il2cpp_gc_collect", "void", [ "int" ]);
    }
    static get gcCollectALittle() {
      return this.r("il2cpp_gc_collect_a_little", "void", []);
    }
    static get gcDisable() {
      return this.r("il2cpp_gc_disable", "void", []);
    }
    static get gcEnable() {
      return this.r("il2cpp_gc_enable", "void", []);
    }
    static get gcGetHeapSize() {
      return this.r("il2cpp_gc_get_heap_size", "int64", []);
    }
    static get gcGetMaxTimeSlice() {
      return this.r("il2cpp_gc_get_max_time_slice_ns", "int64", []);
    }
    static get gcGetUsedSize() {
      return this.r("il2cpp_gc_get_used_size", "int64", []);
    }
    static get gcHandleGetTarget() {
      return this.r("il2cpp_gchandle_get_target", "pointer", [ "uint32" ]);
    }
    static get gcHandleFree() {
      return this.r("il2cpp_gchandle_free", "void", [ "uint32" ]);
    }
    static get gcHandleNew() {
      return this.r("il2cpp_gchandle_new", "uint32", [ "pointer", "bool" ]);
    }
    static get gcHandleNewWeakRef() {
      return this.r("il2cpp_gchandle_new_weakref", "uint32", [ "pointer", "bool" ]);
    }
    static get gcIsDisabled() {
      return this.r("il2cpp_gc_is_disabled", "bool", []);
    }
    static get gcIsIncremental() {
      return this.r("il2cpp_gc_is_incremental", "bool", []);
    }
    static get gcSetMaxTimeSlice() {
      return this.r("il2cpp_gc_set_max_time_slice_ns", "void", [ "int64" ]);
    }
    static get gcStartIncrementalCollection() {
      return this.r("il2cpp_gc_start_incremental_collection", "void", []);
    }
    static get gcStartWorld() {
      return this.r("il2cpp_start_gc_world", "void", []);
    }
    static get gcStopWorld() {
      return this.r("il2cpp_stop_gc_world", "void", []);
    }
    static get getCorlib() {
      return this.r("il2cpp_get_corlib", "pointer", []);
    }
    static get imageGetAssembly() {
      return this.r("il2cpp_image_get_assembly", "pointer", [ "pointer" ]);
    }
    static get imageGetClass() {
      return this.r("il2cpp_image_get_class", "pointer", [ "pointer", "uint" ]);
    }
    static get imageGetClassCount() {
      return this.r("il2cpp_image_get_class_count", "uint32", [ "pointer" ]);
    }
    static get imageGetName() {
      return this.r("il2cpp_image_get_name", "pointer", [ "pointer" ]);
    }
    static get init() {
      return this.r("il2cpp_init", "void", [ "pointer" ]);
    }
    static get livenessAllocateStruct() {
      return this.r("il2cpp_unity_liveness_allocate_struct", "pointer", [ "pointer", "int", "pointer", "pointer", "pointer" ]);
    }
    static get livenessCalculationBegin() {
      return this.r("il2cpp_unity_liveness_calculation_begin", "pointer", [ "pointer", "int", "pointer", "pointer", "pointer", "pointer" ]);
    }
    static get livenessCalculationEnd() {
      return this.r("il2cpp_unity_liveness_calculation_end", "void", [ "pointer" ]);
    }
    static get livenessCalculationFromStatics() {
      return this.r("il2cpp_unity_liveness_calculation_from_statics", "void", [ "pointer" ]);
    }
    static get livenessFinalize() {
      return this.r("il2cpp_unity_liveness_finalize", "void", [ "pointer" ]);
    }
    static get livenessFreeStruct() {
      return this.r("il2cpp_unity_liveness_free_struct", "void", [ "pointer" ]);
    }
    static get memorySnapshotCapture() {
      return this.r("il2cpp_capture_memory_snapshot", "pointer", []);
    }
    static get memorySnapshotFree() {
      return this.r("il2cpp_free_captured_memory_snapshot", "void", [ "pointer" ]);
    }
    static get memorySnapshotGetClasses() {
      return this.r("il2cpp_memory_snapshot_get_classes", "pointer", [ "pointer", "pointer" ]);
    }
    static get memorySnapshotGetObjects() {
      return this.r("il2cpp_memory_snapshot_get_objects", "pointer", [ "pointer", "pointer" ]);
    }
    static get memorySnapshotGetRuntimeInformation() {
      return this.r("il2cpp_memory_snapshot_get_information", [ "uint32", "uint32", "uint32", "uint32", "uint32", "uint32" ], [ "pointer" ]);
    }
    static get methodGetModifier() {
      return this.r("il2cpp_method_get_modifier", "pointer", [ "pointer" ]);
    }
    static get methodGetClass() {
      return this.r("il2cpp_method_get_class", "pointer", [ "pointer" ]);
    }
    static get methodGetFlags() {
      return this.r("il2cpp_method_get_flags", "uint32", [ "pointer", "pointer" ]);
    }
    static get methodGetFromReflection() {
      return this.r("il2cpp_method_get_from_reflection", "pointer", [ "pointer" ]);
    }
    static get methodGetName() {
      return this.r("il2cpp_method_get_name", "pointer", [ "pointer" ]);
    }
    static get methodGetObject() {
      return this.r("il2cpp_method_get_object", "pointer", [ "pointer", "pointer" ]);
    }
    static get methodGetParameterCount() {
      return this.r("il2cpp_method_get_param_count", "uint8", [ "pointer" ]);
    }
    static get methodGetParameterName() {
      return this.r("il2cpp_method_get_param_name", "pointer", [ "pointer", "uint32" ]);
    }
    static get methodGetParameters() {
      return this.r("il2cpp_method_get_parameters", "pointer", [ "pointer", "pointer" ]);
    }
    static get methodGetParameterType() {
      return this.r("il2cpp_method_get_param", "pointer", [ "pointer", "uint32" ]);
    }
    static get methodGetPointer() {
      return this.r("il2cpp_method_get_pointer", "pointer", [ "pointer" ]);
    }
    static get methodGetReturnType() {
      return this.r("il2cpp_method_get_return_type", "pointer", [ "pointer" ]);
    }
    static get methodIsExternal() {
      return this.r("il2cpp_method_is_external", "bool", [ "pointer" ]);
    }
    static get methodIsGeneric() {
      return this.r("il2cpp_method_is_generic", "bool", [ "pointer" ]);
    }
    static get methodIsInflated() {
      return this.r("il2cpp_method_is_inflated", "bool", [ "pointer" ]);
    }
    static get methodIsInstance() {
      return this.r("il2cpp_method_is_instance", "bool", [ "pointer" ]);
    }
    static get methodIsSynchronized() {
      return this.r("il2cpp_method_is_synchronized", "bool", [ "pointer" ]);
    }
    static get monitorEnter() {
      return this.r("il2cpp_monitor_enter", "void", [ "pointer" ]);
    }
    static get monitorExit() {
      return this.r("il2cpp_monitor_exit", "void", [ "pointer" ]);
    }
    static get monitorPulse() {
      return this.r("il2cpp_monitor_pulse", "void", [ "pointer" ]);
    }
    static get monitorPulseAll() {
      return this.r("il2cpp_monitor_pulse_all", "void", [ "pointer" ]);
    }
    static get monitorTryEnter() {
      return this.r("il2cpp_monitor_try_enter", "bool", [ "pointer", "uint32" ]);
    }
    static get monitorTryWait() {
      return this.r("il2cpp_monitor_try_wait", "bool", [ "pointer", "uint32" ]);
    }
    static get monitorWait() {
      return this.r("il2cpp_monitor_wait", "void", [ "pointer" ]);
    }
    static get objectGetClass() {
      return this.r("il2cpp_object_get_class", "pointer", [ "pointer" ]);
    }
    static get objectGetVirtualMethod() {
      return this.r("il2cpp_object_get_virtual_method", "pointer", [ "pointer", "pointer" ]);
    }
    static get objectInit() {
      return this.r("il2cpp_runtime_object_init_exception", "void", [ "pointer", "pointer" ]);
    }
    static get objectNew() {
      return this.r("il2cpp_object_new", "pointer", [ "pointer" ]);
    }
    static get objectGetSize() {
      return this.r("il2cpp_object_get_size", "uint32", [ "pointer" ]);
    }
    static get objectUnbox() {
      return this.r("il2cpp_object_unbox", "pointer", [ "pointer" ]);
    }
    static get resolveInternalCall() {
      return this.r("il2cpp_resolve_icall", "pointer", [ "pointer" ]);
    }
    static get stringChars() {
      return this.r("il2cpp_string_chars", "pointer", [ "pointer" ]);
    }
    static get stringLength() {
      return this.r("il2cpp_string_length", "int32", [ "pointer" ]);
    }
    static get stringNew() {
      return this.r("il2cpp_string_new", "pointer", [ "pointer" ]);
    }
    static get stringSetLength() {
      return this.r("il2cpp_string_set_length", "void", [ "pointer", "int32" ]);
    }
    static get valueBox() {
      return this.r("il2cpp_value_box", "pointer", [ "pointer", "pointer" ]);
    }
    static get threadAttach() {
      return this.r("il2cpp_thread_attach", "pointer", [ "pointer" ]);
    }
    static get threadCurrent() {
      return this.r("il2cpp_thread_current", "pointer", []);
    }
    static get threadGetAllAttachedThreads() {
      return this.r("il2cpp_thread_get_all_attached_threads", "pointer", [ "pointer" ]);
    }
    static get threadIsVm() {
      return this.r("il2cpp_is_vm_thread", "bool", [ "pointer" ]);
    }
    static get threadDetach() {
      return this.r("il2cpp_thread_detach", "void", [ "pointer" ]);
    }
    static get typeGetName() {
      return this.r("il2cpp_type_get_name", "pointer", [ "pointer" ]);
    }
    static get typeGetObject() {
      return this.r("il2cpp_type_get_object", "pointer", [ "pointer" ]);
    }
    static get typeGetTypeEnum() {
      return this.r("il2cpp_type_get_type", "int", [ "pointer" ]);
    }
    static get typeIsByReference() {
      return this.r("il2cpp_type_is_byref", "bool", [ "pointer" ]);
    }
    static get typeIsPrimitive() {
      return this.r("il2cpp_type_is_primitive", "bool", [ "pointer" ]);
    }
    static get cModule() {
      const t = new CModule("#include <stdint.h>\n\n#define OFFSET_OF(name, type)                                                  \\\n  int16_t name (char * p, type e)                                              \\\n  {                                                                            \\\n    for (int16_t i = 0; i < 512; i++)                                          \\\n      if (*((type *) p + i) == e)                                              \\\n        return i;                                                              \\\n    return -1;                                                                 \\\n  }\n\nOFFSET_OF (offset_of_int32, int32_t)\nOFFSET_OF (offset_of_pointer, void *)\n"), n = new NativeFunction(t.offset_of_int32, "int16", [ "pointer", "int32" ]), i = new NativeFunction(t.offset_of_pointer, "int16", [ "pointer", "pointer" ]), r = e.corlib.class("System.String"), s = e.corlib.class("System.DateTime"), a = e.corlib.class("System.Reflection.Module");
      s.initialize(), a.initialize();
      const l = (s.tryField("daysmonth") ?? s.tryField("DaysToMonth365") ?? s.field("s_daysToMonth365")).value, o = a.field("FilterTypeName").value, c = o.field("method_ptr").value, p = o.field("method").value, u = o.method("Invoke"), d = `\n                #define IL2CPP_STRING_SET_LENGTH_OFFSET ${n(e.string("vfsfitvnm"), 9)}\n                #define IL2CPP_ARRAY_GET_ELEMENTS_OFFSET ${n(l, 31) - 1}\n                #define IL2CPP_CLASS_GET_ACTUAL_INSTANCE_SIZE_OFFSET ${n(r, r.instanceSize - 2)}\n                #define IL2CPP_METHOD_GET_POINTER_OFFSET ${i(p, c)}\n                #define IL2CPP_METHOD_GET_FROM_REFLECTION_OFFSET ${i(u.object, u)}\n            `;
      t.dispose();
      return new CModule(d + '#include <stdint.h>\n#include <string.h>\n\ntypedef void Il2CppArray;\ntypedef void Il2CppAssembly;\ntypedef void Il2CppClass;\ntypedef void Il2CppDomain;\ntypedef void Il2CppField;\ntypedef void Il2CppImage;\ntypedef void Il2CppMethod;\ntypedef void Il2CppObject;\ntypedef void Il2CppString;\ntypedef void Il2CppType;\n\ntypedef enum _Il2CppTypeEnum Il2CppTypeEnum;\n\nenum _Il2CppTypeEnum\n{\n  IL2CPP_TYPE_END = 0x00,\n  IL2CPP_TYPE_VOID = 0x01,\n  IL2CPP_TYPE_BOOLEAN = 0x02,\n  IL2CPP_TYPE_CHAR = 0x03,\n  IL2CPP_TYPE_I1 = 0x04,\n  IL2CPP_TYPE_U1 = 0x05,\n  IL2CPP_TYPE_I2 = 0x06,\n  IL2CPP_TYPE_U2 = 0x07,\n  IL2CPP_TYPE_I4 = 0x08,\n  IL2CPP_TYPE_U4 = 0x09,\n  IL2CPP_TYPE_I8 = 0x0a,\n  IL2CPP_TYPE_U8 = 0x0b,\n  IL2CPP_TYPE_R4 = 0x0c,\n  IL2CPP_TYPE_R8 = 0x0d,\n  IL2CPP_TYPE_STRING = 0x0e,\n  IL2CPP_TYPE_PTR = 0x0f,\n  IL2CPP_TYPE_BYREF = 0x10,\n  IL2CPP_TYPE_VALUETYPE = 0x11,\n  IL2CPP_TYPE_CLASS = 0x12,\n  IL2CPP_TYPE_VAR = 0x13,\n  IL2CPP_TYPE_ARRAY = 0x14,\n  IL2CPP_TYPE_GENERICINST = 0x15,\n  IL2CPP_TYPE_TYPEDBYREF = 0x16,\n  IL2CPP_TYPE_I = 0x18,\n  IL2CPP_TYPE_U = 0x19,\n  IL2CPP_TYPE_FNPTR = 0x1b,\n  IL2CPP_TYPE_OBJECT = 0x1c,\n  IL2CPP_TYPE_SZARRAY = 0x1d,\n  IL2CPP_TYPE_MVAR = 0x1e,\n  IL2CPP_TYPE_CMOD_REQD = 0x1f,\n  IL2CPP_TYPE_CMOD_OPT = 0x20,\n  IL2CPP_TYPE_INTERNAL = 0x21,\n  IL2CPP_TYPE_MODIFIER = 0x40,\n  IL2CPP_TYPE_SENTINEL = 0x41,\n  IL2CPP_TYPE_PINNED = 0x45,\n  IL2CPP_TYPE_ENUM = 0x55\n};\n\n#define THREAD_STATIC_FIELD_OFFSET -1;\n\n#define FIELD_ATTRIBUTE_FIELD_ACCESS_MASK 0x0007\n#define FIELD_ATTRIBUTE_COMPILER_CONTROLLED 0x0000\n#define FIELD_ATTRIBUTE_PRIVATE 0x0001\n#define FIELD_ATTRIBUTE_FAM_AND_ASSEM 0x0002\n#define FIELD_ATTRIBUTE_ASSEMBLY 0x0003\n#define FIELD_ATTRIBUTE_FAMILY 0x0004\n#define FIELD_ATTRIBUTE_FAM_OR_ASSEM 0x0005\n#define FIELD_ATTRIBUTE_PUBLIC 0x0006\n\n#define FIELD_ATTRIBUTE_STATIC 0x0010\n#define FIELD_ATTRIBUTE_LITERAL 0x0040\n\n#define METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK 0x0007\n#define METHOD_ATTRIBUTE_COMPILER_CONTROLLED 0x0000\n#define METHOD_ATTRIBUTE_PRIVATE 0x0001\n#define METHOD_ATTRIBUTE_FAM_AND_ASSEM 0x0002\n#define METHOD_ATTRIBUTE_ASSEMBLY 0x0003\n#define METHOD_ATTRIBUTE_FAMILY 0x0004\n#define METHOD_ATTRIBUTE_FAM_OR_ASSEM 0x0005\n#define METHOD_ATTRIBUTE_PUBLIC 0x0006\n\n#define METHOD_ATTRIBUTE_STATIC 0x0010\n#define METHOD_IMPL_ATTRIBUTE_INTERNAL_CALL 0x1000\n#define METHOD_IMPL_ATTRIBUTE_SYNCHRONIZED 0x0020\n\n#ifndef IL2CPP_STRING_SET_LENGTH_OFFSET\n#define IL2CPP_STRING_SET_LENGTH_OFFSET 0\n#endif\n\n#ifndef IL2CPP_ARRAY_GET_ELEMENTS_OFFSET\n#define IL2CPP_ARRAY_GET_ELEMENTS_OFFSET 0\n#endif\n\n#ifndef IL2CPP_CLASS_GET_ACTUAL_INSTANCE_SIZE_OFFSET\n#define IL2CPP_CLASS_GET_ACTUAL_INSTANCE_SIZE_OFFSET 0\n#endif\n\n#ifndef IL2CPP_METHOD_GET_POINTER_OFFSET\n#define IL2CPP_METHOD_GET_POINTER_OFFSET 0\n#endif\n\n#ifndef IL2CPP_METHOD_GET_FROM_REFLECTION_OFFSET\n#define IL2CPP_METHOD_GET_FROM_REFLECTION_OFFSET 0\n#endif\n\nextern Il2CppClass * il2cpp_class_from_name (const Il2CppImage *, const char *,\n                                             const char *);\nextern Il2CppMethod * il2cpp_class_get_method_from_name (Il2CppClass *,\n                                                         const char *, int32_t);\nextern const char * il2cpp_class_get_name (Il2CppClass *);\nextern int il2cpp_field_get_flags (Il2CppField *);\nextern size_t il2cpp_field_get_offset (Il2CppField *);\nextern void il2cpp_free (void *);\nextern const Il2CppImage * il2cpp_image_get_corlib (void);\nextern uint32_t il2cpp_method_get_flags (Il2CppMethod *, uint32_t *);\nextern char * il2cpp_type_get_name (Il2CppType *);\nextern Il2CppTypeEnum il2cpp_type_get_type_enum (Il2CppType *);\n\nvoid\nil2cpp_string_set_length (Il2CppString * string, int32_t length)\n{\n  *((int32_t *) string + IL2CPP_STRING_SET_LENGTH_OFFSET) = length;\n}\n\nvoid *\nil2cpp_array_get_elements (Il2CppArray * array)\n{\n  return (int32_t *) array + IL2CPP_ARRAY_GET_ELEMENTS_OFFSET;\n}\n\nuint8_t\nil2cpp_type_is_byref (Il2CppType * type)\n{\n  char * name;\n  char last_char;\n\n  name = il2cpp_type_get_name (type);\n  last_char = name[strlen (name) - 1];\n\n  il2cpp_free (name);\n  return last_char == \'&\';\n}\n\nuint8_t\nil2cpp_type_is_primitive (Il2CppType * type)\n{\n  Il2CppTypeEnum type_enum;\n\n  type_enum = il2cpp_type_get_type_enum (type);\n\n  return ((type_enum >= IL2CPP_TYPE_BOOLEAN && type_enum <= IL2CPP_TYPE_R8) ||\n          type_enum == IL2CPP_TYPE_I || type_enum == IL2CPP_TYPE_U);\n}\n\nint32_t\nil2cpp_class_get_actual_instance_size (Il2CppClass * class)\n{\n  return *((int32_t *) class + IL2CPP_CLASS_GET_ACTUAL_INSTANCE_SIZE_OFFSET);\n}\n\nuint8_t\nil2cpp_class_get_rank (Il2CppClass * class)\n{\n  uint8_t rank;\n  const char * name;\n\n  rank = 0;\n  name = il2cpp_class_get_name (class);\n\n  for (uint16_t i = strlen (name) - 1; i > 0; i--)\n  {\n    char c = name[i];\n\n    if (c == \']\')\n      rank++;\n    else if (c == \'[\' || rank == 0)\n      break;\n    else if (c == \',\')\n      rank++;\n    else\n      break;\n  }\n\n  return rank;\n}\n\nconst char *\nil2cpp_field_get_modifier (Il2CppField * field)\n{\n  int flags;\n\n  flags = il2cpp_field_get_flags (field);\n\n  switch (flags & FIELD_ATTRIBUTE_FIELD_ACCESS_MASK)\n  {\n  case FIELD_ATTRIBUTE_PRIVATE:\n    return "private";\n  case FIELD_ATTRIBUTE_FAM_AND_ASSEM:\n    return "private protected";\n  case FIELD_ATTRIBUTE_ASSEMBLY:\n    return "internal";\n  case FIELD_ATTRIBUTE_FAMILY:\n    return "protected";\n  case FIELD_ATTRIBUTE_FAM_OR_ASSEM:\n    return "protected internal";\n  case FIELD_ATTRIBUTE_PUBLIC:\n    return "public";\n  }\n\n  return "";\n}\n\nuint8_t\nil2cpp_field_is_literal (Il2CppField * field)\n{\n  return (il2cpp_field_get_flags (field) & FIELD_ATTRIBUTE_LITERAL) != 0;\n}\n\nuint8_t\nil2cpp_field_is_static (Il2CppField * field)\n{\n  return (il2cpp_field_get_flags (field) & FIELD_ATTRIBUTE_STATIC) != 0;\n}\n\nuint8_t\nil2cpp_field_is_thread_static (Il2CppField * field)\n{\n  return il2cpp_field_get_offset (field) == THREAD_STATIC_FIELD_OFFSET;\n}\n\nconst char *\nil2cpp_method_get_modifier (Il2CppMethod * method)\n{\n  uint32_t flags;\n\n  flags = il2cpp_method_get_flags (method, NULL);\n\n  switch (flags & METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK)\n  {\n  case METHOD_ATTRIBUTE_PRIVATE:\n    return "private";\n  case METHOD_ATTRIBUTE_FAM_AND_ASSEM:\n    return "private protected";\n  case METHOD_ATTRIBUTE_ASSEMBLY:\n    return "internal";\n  case METHOD_ATTRIBUTE_FAMILY:\n    return "protected";\n  case METHOD_ATTRIBUTE_FAM_OR_ASSEM:\n    return "protected internal";\n  case METHOD_ATTRIBUTE_PUBLIC:\n    return "public";\n  }\n\n  return "";\n}\n\nIl2CppMethod *\nil2cpp_method_get_from_reflection (Il2CppObject * object)\n{\n  return *((void **) object + IL2CPP_METHOD_GET_FROM_REFLECTION_OFFSET);\n}\n\nvoid *\nil2cpp_method_get_pointer (Il2CppMethod * method)\n{\n  return *((void **) method + IL2CPP_METHOD_GET_POINTER_OFFSET);\n}\n\nuint8_t\nil2cpp_method_is_external (Il2CppMethod * method)\n{\n  uint32_t implementation_flags;\n\n  il2cpp_method_get_flags (method, &implementation_flags);\n\n  return (implementation_flags & METHOD_IMPL_ATTRIBUTE_INTERNAL_CALL) != 0;\n}\n\nuint8_t\nil2cpp_method_is_synchronized (Il2CppMethod * method)\n{\n  uint32_t implementation_flags;\n\n  il2cpp_method_get_flags (method, &implementation_flags);\n\n  return (implementation_flags & METHOD_IMPL_ATTRIBUTE_SYNCHRONIZED) != 0;\n}\n\nIl2CppObject *\nil2cpp_domain_get_object (void)\n{\n  const Il2CppImage * cor_image = il2cpp_image_get_corlib ();\n  Il2CppClass * system_appdomain_class =\n      il2cpp_class_from_name (cor_image, "System", "AppDomain");\n  Il2CppMethod * get_current_domain_method = il2cpp_class_get_method_from_name (\n      system_appdomain_class, "get_CurrentDomain", 0);\n  Il2CppObject * (*get_current_domain) (void) =\n      il2cpp_method_get_pointer (get_current_domain_method);\n\n  return get_current_domain ();\n}\n#include <stdint.h>\n#include <string.h>\n\ntypedef struct Il2CppManagedMemorySnapshot Il2CppManagedMemorySnapshot;\ntypedef struct Il2CppMetadataType Il2CppMetadataType;\n\nstruct Il2CppManagedMemorySnapshot\n{\n  struct Il2CppManagedHeap\n  {\n    uint32_t section_count;\n    void * sections;\n  } heap;\n  struct Il2CppStacks\n  {\n    uint32_t stack_count;\n    void * stacks;\n  } stacks;\n  struct Il2CppMetadataSnapshot\n  {\n    uint32_t type_count;\n    Il2CppMetadataType * types;\n  } metadata_snapshot;\n  struct Il2CppGCHandles\n  {\n    uint32_t tracked_object_count;\n    void ** pointers_to_objects;\n  } gc_handles;\n  struct Il2CppRuntimeInformation\n  {\n    uint32_t pointer_size;\n    uint32_t object_header_size;\n    uint32_t array_header_size;\n    uint32_t array_bounds_offset_in_header;\n    uint32_t array_size_offset_in_header;\n    uint32_t allocation_granularity;\n  } runtime_information;\n  void * additional_user_information;\n};\n\nstruct Il2CppMetadataType\n{\n  uint32_t flags;\n  void * fields;\n  uint32_t field_count;\n  uint32_t statics_size;\n  uint8_t * statics;\n  uint32_t base_or_element_type_index;\n  char * name;\n  const char * assembly_name;\n  uint64_t type_info_address;\n  uint32_t size;\n};\n\nuintptr_t\nil2cpp_memory_snapshot_get_classes (\n    const Il2CppManagedMemorySnapshot * snapshot, Il2CppMetadataType ** iter)\n{\n  const int zero = 0;\n  const void * null = 0;\n\n  if (iter != NULL && snapshot->metadata_snapshot.type_count > zero)\n  {\n    if (*iter == null)\n    {\n      *iter = snapshot->metadata_snapshot.types;\n      return (uintptr_t) (*iter)->type_info_address;\n    }\n    else\n    {\n      Il2CppMetadataType * metadata_type = *iter + 1;\n\n      if (metadata_type < snapshot->metadata_snapshot.types +\n                              snapshot->metadata_snapshot.type_count)\n      {\n        *iter = metadata_type;\n        return (uintptr_t) (*iter)->type_info_address;\n      }\n    }\n  }\n  return 0;\n}\n\nvoid **\nil2cpp_memory_snapshot_get_objects (\n    const Il2CppManagedMemorySnapshot * snapshot, uint32_t * size)\n{\n  *size = snapshot->gc_handles.tracked_object_count;\n  return snapshot->gc_handles.pointers_to_objects;\n}\n\nstruct Il2CppRuntimeInformation\nil2cpp_memory_snapshot_get_information (\n    const Il2CppManagedMemorySnapshot * snapshot)\n{\n  return snapshot->runtime_information;\n}\n', {
        il2cpp_class_from_name: this.classFromName,
        il2cpp_class_get_method_from_name: this.classGetMethodFromName,
        il2cpp_class_get_name: this.classGetName,
        il2cpp_field_get_flags: this.fieldGetFlags,
        il2cpp_field_get_offset: this.fieldGetOffset,
        il2cpp_free: this.free,
        il2cpp_image_get_corlib: this.getCorlib,
        il2cpp_method_get_flags: this.methodGetFlags,
        il2cpp_type_get_name: this.typeGetName,
        il2cpp_type_get_type_enum: this.typeGetTypeEnum
      });
    }
    static r(t, n, r) {
      const s = e.module.findExportByName(t) ?? this.cModule[t];
      return null == s && i(`cannot resolve export ${t}`), new NativeFunction(s, n, r);
    }
  }
  n([ o ], t, "alloc", null), n([ o ], t, "arrayGetElements", null), n([ o ], t, "arrayGetLength", null), 
  n([ o ], t, "arrayNew", null), n([ o ], t, "assemblyGetImage", null), n([ o ], t, "classForEach", null), 
  n([ o ], t, "classFromName", null), n([ o ], t, "classFromSystemType", null), n([ o ], t, "classFromType", null), 
  n([ o ], t, "classGetActualInstanceSize", null), n([ o ], t, "classGetArrayClass", null), 
  n([ o ], t, "classGetArrayElementSize", null), n([ o ], t, "classGetAssemblyName", null), 
  n([ o ], t, "classGetBaseType", null), n([ o ], t, "classGetDeclaringType", null), 
  n([ o ], t, "classGetElementClass", null), n([ o ], t, "classGetFieldFromName", null), 
  n([ o ], t, "classGetFields", null), n([ o ], t, "classGetFlags", null), n([ o ], t, "classGetImage", null), 
  n([ o ], t, "classGetInstanceSize", null), n([ o ], t, "classGetInterfaces", null), 
  n([ o ], t, "classGetMethodFromName", null), n([ o ], t, "classGetMethods", null), 
  n([ o ], t, "classGetName", null), n([ o ], t, "classGetNamespace", null), n([ o ], t, "classGetNestedClasses", null), 
  n([ o ], t, "classGetParent", null), n([ o ], t, "classGetRank", null), n([ o ], t, "classGetStaticFieldData", null), 
  n([ o ], t, "classGetValueSize", null), n([ o ], t, "classGetType", null), n([ o ], t, "classHasReferences", null), 
  n([ o ], t, "classInit", null), n([ o ], t, "classIsAbstract", null), n([ o ], t, "classIsAssignableFrom", null), 
  n([ o ], t, "classIsBlittable", null), n([ o ], t, "classIsEnum", null), n([ o ], t, "classIsGeneric", null), 
  n([ o ], t, "classIsInflated", null), n([ o ], t, "classIsInterface", null), n([ o ], t, "classIsSubclassOf", null), 
  n([ o ], t, "classIsValueType", null), n([ o ], t, "domainAssemblyOpen", null), 
  n([ o ], t, "domainGet", null), n([ o ], t, "domainGetAssemblies", null), n([ o ], t, "domainGetObject", null), 
  n([ o ], t, "fieldGetModifier", null), n([ o ], t, "fieldGetClass", null), n([ o ], t, "fieldGetFlags", null), 
  n([ o ], t, "fieldGetName", null), n([ o ], t, "fieldGetOffset", null), n([ o ], t, "fieldGetStaticValue", null), 
  n([ o ], t, "fieldGetType", null), n([ o ], t, "fieldIsLiteral", null), n([ o ], t, "fieldIsStatic", null), 
  n([ o ], t, "fieldIsThreadStatic", null), n([ o ], t, "fieldSetStaticValue", null), 
  n([ o ], t, "free", null), n([ o ], t, "gcCollect", null), n([ o ], t, "gcCollectALittle", null), 
  n([ o ], t, "gcDisable", null), n([ o ], t, "gcEnable", null), n([ o ], t, "gcGetHeapSize", null), 
  n([ o ], t, "gcGetMaxTimeSlice", null), n([ o ], t, "gcGetUsedSize", null), n([ o ], t, "gcHandleGetTarget", null), 
  n([ o ], t, "gcHandleFree", null), n([ o ], t, "gcHandleNew", null), n([ o ], t, "gcHandleNewWeakRef", null), 
  n([ o ], t, "gcIsDisabled", null), n([ o ], t, "gcIsIncremental", null), n([ o ], t, "gcSetMaxTimeSlice", null), 
  n([ o ], t, "gcStartIncrementalCollection", null), n([ o ], t, "gcStartWorld", null), 
  n([ o ], t, "gcStopWorld", null), n([ o ], t, "getCorlib", null), n([ o ], t, "imageGetAssembly", null), 
  n([ o ], t, "imageGetClass", null), n([ o ], t, "imageGetClassCount", null), n([ o ], t, "imageGetName", null), 
  n([ o ], t, "init", null), n([ o ], t, "livenessAllocateStruct", null), n([ o ], t, "livenessCalculationBegin", null), 
  n([ o ], t, "livenessCalculationEnd", null), n([ o ], t, "livenessCalculationFromStatics", null), 
  n([ o ], t, "livenessFinalize", null), n([ o ], t, "livenessFreeStruct", null), 
  n([ o ], t, "memorySnapshotCapture", null), n([ o ], t, "memorySnapshotFree", null), 
  n([ o ], t, "memorySnapshotGetClasses", null), n([ o ], t, "memorySnapshotGetObjects", null), 
  n([ o ], t, "memorySnapshotGetRuntimeInformation", null), n([ o ], t, "methodGetModifier", null), 
  n([ o ], t, "methodGetClass", null), n([ o ], t, "methodGetFlags", null), n([ o ], t, "methodGetFromReflection", null), 
  n([ o ], t, "methodGetName", null), n([ o ], t, "methodGetObject", null), n([ o ], t, "methodGetParameterCount", null), 
  n([ o ], t, "methodGetParameterName", null), n([ o ], t, "methodGetParameters", null), 
  n([ o ], t, "methodGetParameterType", null), n([ o ], t, "methodGetPointer", null), 
  n([ o ], t, "methodGetReturnType", null), n([ o ], t, "methodIsExternal", null), 
  n([ o ], t, "methodIsGeneric", null), n([ o ], t, "methodIsInflated", null), n([ o ], t, "methodIsInstance", null), 
  n([ o ], t, "methodIsSynchronized", null), n([ o ], t, "monitorEnter", null), n([ o ], t, "monitorExit", null), 
  n([ o ], t, "monitorPulse", null), n([ o ], t, "monitorPulseAll", null), n([ o ], t, "monitorTryEnter", null), 
  n([ o ], t, "monitorTryWait", null), n([ o ], t, "monitorWait", null), n([ o ], t, "objectGetClass", null), 
  n([ o ], t, "objectGetVirtualMethod", null), n([ o ], t, "objectInit", null), n([ o ], t, "objectNew", null), 
  n([ o ], t, "objectGetSize", null), n([ o ], t, "objectUnbox", null), n([ o ], t, "resolveInternalCall", null), 
  n([ o ], t, "stringChars", null), n([ o ], t, "stringLength", null), n([ o ], t, "stringNew", null), 
  n([ o ], t, "stringSetLength", null), n([ o ], t, "valueBox", null), n([ o ], t, "threadAttach", null), 
  n([ o ], t, "threadCurrent", null), n([ o ], t, "threadGetAllAttachedThreads", null), 
  n([ o ], t, "threadIsVm", null), n([ o ], t, "threadDetach", null), n([ o ], t, "typeGetName", null), 
  n([ o ], t, "typeGetObject", null), n([ o ], t, "typeGetTypeEnum", null), n([ o ], t, "typeIsByReference", null), 
  n([ o ], t, "typeIsPrimitive", null), n([ o ], t, "cModule", null), e.Api = t;
}(t || (t = {})), function(t) {
  t.application = {
    get dataPath() {
      const e = t.Runtime.internalCall("UnityEngine.Application::get_persistentDataPath", "pointer", []);
      return new t.String(e()).content;
    },
    get identifier() {
      const e = t.Runtime.internalCall("UnityEngine.Application::get_identifier", "pointer", []) ?? t.Runtime.internalCall("UnityEngine.Application::get_bundleIdentifier", "pointer", []);
      return e ? new t.String(e()).content : null;
    },
    get version() {
      const e = t.Runtime.internalCall("UnityEngine.Application::get_version", "pointer", []);
      return e ? new t.String(e()).content : null;
    }
  }, l(t, "unityVersion", (() => {
    const n = t.Runtime.internalCall("UnityEngine.Application::get_unityVersion", "pointer", []);
    if (null != n) return new t.String(n()).content;
    for (const n of t.module.enumerateRanges("r--").concat(Process.getRangeByAddress(t.module.base))) for (let {address: t} of Memory.scanSync(n.base, n.size, "45 64 69 74 6f 72 ?? 44 61 74 61 ?? 69 6c 32 63 70 70")) {
      for (;0 != t.readU8(); ) t = t.sub(1);
      const n = e.find(t.add(1).readCString());
      if (null != n) return n;
    }
    i("couldn't determine the Unity version, please specify it manually");
  }), o), l(t, "unityVersionIsBelow201830", (() => e.lt(t.unityVersion, "2018.3.0")), o);
}(t || (t = {})), function(e) {
  e.dump = function(t, n) {
    t = t ?? `${e.application.identifier ?? "unknown"}_${e.application.version ?? "unknown"}.cs`;
    const i = `${n ?? e.application.dataPath}/${t}`, r = new File(i, "w");
    for (const t of e.domain.assemblies) {
      a(`dumping ${t.name}...`);
      for (const e of t.image.classes) r.write(`${e}\n\n`);
    }
    r.flush(), r.close(), s(`dump saved to ${i}`);
  };
}(t || (t = {})), function(e) {
  e.installExceptionListener = function(t = "current") {
    const n = e.Api.threadCurrent();
    return Interceptor.attach(e.module.getExportByName("__cxa_throw"), (function(i) {
      ("current" != t || e.Api.threadCurrent().equals(n)) && a(new e.Object(i[0].readPointer()));
    }));
  };
}(t || (t = {})), function(e) {
  e.is = function(t) {
    return n => n instanceof e.Class ? t.isAssignableFrom(n) : t.isAssignableFrom(n.class);
  }, e.isExactly = function(t) {
    return n => n instanceof e.Class ? n.equals(t) : n.class.equals(t);
  };
}(t || (t = {})), function(t) {
  t.gc = {
    get heapSize() {
      return t.Api.gcGetHeapSize();
    },
    get isEnabled() {
      return !t.Api.gcIsDisabled();
    },
    get isIncremental() {
      return !!t.Api.gcIsIncremental();
    },
    get maxTimeSlice() {
      return t.Api.gcGetMaxTimeSlice();
    },
    get usedHeapSize() {
      return t.Api.gcGetUsedSize();
    },
    set isEnabled(e) {
      e ? t.Api.gcEnable() : t.Api.gcDisable();
    },
    set maxTimeSlice(e) {
      t.Api.gcSetMaxTimeSlice(e);
    },
    choose(n) {
      const i = [], r = new NativeCallback(((e, n) => {
        for (let r = 0; r < n; r++) i.push(new t.Object(e.add(r * Process.pointerSize).readPointer()));
      }), "void", [ "pointer", "int", "pointer" ]);
      if (e.gte(t.unityVersion, "2021.2.0")) {
        const e = new NativeCallback(((e, n) => e.isNull() || 0 != n.compare(0) ? t.alloc(n) : (t.free(e), 
        NULL)), "pointer", [ "pointer", "size_t", "pointer" ]);
        this.stopWorld();
        const i = t.Api.livenessAllocateStruct(n, 0, r, NULL, e);
        t.Api.livenessCalculationFromStatics(i), t.Api.livenessFinalize(i), this.startWorld(), 
        t.Api.livenessFreeStruct(i);
      } else {
        const e = new NativeCallback((() => {}), "void", []), i = t.Api.livenessCalculationBegin(n, 0, r, NULL, e, e);
        t.Api.livenessCalculationFromStatics(i), t.Api.livenessCalculationEnd(i);
      }
      return i;
    },
    collect(e) {
      t.Api.gcCollect(e < 0 ? 0 : e > 2 ? 2 : e);
    },
    collectALittle() {
      t.Api.gcCollectALittle();
    },
    startWorld: () => t.Api.gcStartWorld(),
    startIncrementalCollection: () => t.Api.gcStartIncrementalCollection(),
    stopWorld: () => t.Api.gcStopWorld()
  };
}(t || (t = {})), function(e) {
  function t(n) {
    const i = n.type.class.fields.filter((e => !e.isStatic));
    return 0 == i.length ? [ n.handle.readU8() ] : i.map((e => e.withHolder(n).value)).map((n => n instanceof e.ValueType ? t(n) : n instanceof c ? n.handle : "boolean" == typeof n ? +n : n));
  }
  e.alloc = function(t = Process.pointerSize) {
    return e.Api.alloc(t);
  }, e.free = function(t) {
    return e.Api.free(t);
  }, e.read = function(t, n) {
    switch (n.typeEnum) {
     case 2:
      return !!t.readS8();

     case 4:
      return t.readS8();

     case 5:
      return t.readU8();

     case 6:
      return t.readS16();

     case 7:
     case 3:
      return t.readU16();

     case 8:
      return t.readS32();

     case 9:
      return t.readU32();

     case 10:
      return t.readS64();

     case 11:
      return t.readU64();

     case 12:
      return t.readFloat();

     case 13:
      return t.readDouble();

     case 24:
     case 25:
      return t.readPointer();

     case 15:
      return new e.Pointer(t.readPointer(), n.class.baseType);

     case 17:
      return new e.ValueType(t, n);

     case 28:
     case 18:
      return new e.Object(t.readPointer());

     case 21:
      return n.class.isValueType ? new e.ValueType(t, n) : new e.Object(t.readPointer());

     case 14:
      return new e.String(t.readPointer());

     case 29:
     case 20:
      return new e.Array(t.readPointer());
    }
    i(`read: "${n.name}" (${n.typeEnum}) has not been handled yet. Please file an issue!`);
  }, e.write = function(t, n, r) {
    switch (r.typeEnum) {
     case 2:
      return t.writeS8(+n);

     case 4:
      return t.writeS8(n);

     case 5:
      return t.writeU8(n);

     case 6:
      return t.writeS16(n);

     case 7:
     case 3:
      return t.writeU16(n);

     case 8:
      return t.writeS32(n);

     case 9:
      return t.writeU32(n);

     case 10:
      return t.writeS64(n);

     case 11:
      return t.writeU64(n);

     case 12:
      return t.writeFloat(n);

     case 13:
      return t.writeDouble(n);

     case 24:
     case 25:
     case 15:
     case 17:
     case 14:
     case 28:
     case 18:
     case 29:
     case 20:
     case 21:
      return n instanceof e.ValueType ? (Memory.copy(t, n, r.class.valueSize), t) : t.writePointer(n);
    }
    i(`write: "${r.name}" (${r.typeEnum}) has not been handled yet. Please file an issue!`);
  }, e.fromFridaValue = function(t, n) {
    if (globalThis.Array.isArray(t)) return function(t, n) {
      function i(t, n = 0) {
        const r = [];
        for (const s of t.class.fields) if (!s.isStatic) {
          const t = n + s.offset - e.Object.headerSize;
          17 == s.type.typeEnum || 21 == s.type.typeEnum && s.type.class.isValueType ? r.push(...i(s.type, t)) : r.push([ s.type.typeEnum, t ]);
        }
        return 0 == r.length && r.push([ 5, 0 ]), r;
      }
      const s = Memory.alloc(t.class.valueSize);
      n = n.flat(1 / 0);
      const a = i(t);
      for (let e = 0; e < n.length; e++) {
        const t = n[e], [i, l] = a[e], o = s.add(l);
        switch (i) {
         case 2:
         case 4:
          o.writeS8(t);
          break;

         case 5:
          o.writeU8(t);
          break;

         case 6:
          o.writeS16(t);
          break;

         case 7:
         case 3:
          o.writeU16(t);
          break;

         case 8:
          o.writeS32(t);
          break;

         case 9:
          o.writeU32(t);
          break;

         case 10:
          o.writeS64(t);
          break;

         case 11:
          o.writeU64(t);
          break;

         case 12:
          o.writeFloat(t);
          break;

         case 13:
          o.writeDouble(t);
          break;

         case 24:
         case 25:
         case 15:
         case 29:
         case 20:
         case 14:
         case 28:
         case 18:
         case 21:
          o.writePointer(t);
          break;

         default:
          r(`arrayToValueType: defaulting ${i} to pointer`), o.writePointer(t);
        }
      }
      return new e.ValueType(s, t);
    }(n, t);
    if (!(t instanceof NativePointer)) return 2 == n.typeEnum ? !!t : t;
    if (n.isByReference) return new e.Reference(t, n);
    switch (n.typeEnum) {
     case 15:
      return new e.Pointer(t, n.class.baseType);

     case 14:
      return new e.String(t);

     case 18:
     case 21:
     case 28:
      return new e.Object(t);

     case 29:
     case 20:
      return new e.Array(t);

     default:
      return t;
    }
  }, e.toFridaValue = function(n) {
    return "boolean" == typeof n ? +n : n instanceof e.ValueType ? t(n) : n;
  };
}(t || (t = {})), function(e) {
  l(e, "moduleName", (() => {
    switch (Process.platform) {
     case "linux":
      try {
        Java.androidVersion;
        return "libil2cpp.so";
      } catch (e) {
        return "GameAssembly.so";
      }

     case "windows":
      return "GameAssembly.dll";

     case "darwin":
      try {
        return "UnityFramework";
      } catch (e) {
        return "GameAssembly.dylib";
      }
    }
    i(`${Process.platform} is not supported yet`);
  })), l(e, "module", (() => Process.getModuleByName(e.moduleName)), o), e.initialize = async function() {
    if ("darwin" == Process.platform) {
      let t = Process.findModuleByAddress(Module.findExportByName(null, "il2cpp_init") ?? NULL)?.name;
      null == t && (t = await d("UnityFramework", "GameAssembly.dylib")), Reflect.defineProperty(e, "moduleName", {
        value: t
      });
    } else await d(e.moduleName);
    e.Api.getCorlib().isNull() && await new Promise((t => {
      const n = Interceptor.attach(e.Api.init, {
        onLeave() {
          n.detach(), setImmediate(t);
        }
      });
    }));
  };
}(t || (t = {})), function(e) {
  e.perform = async function(t) {
    await e.initialize();
    let n = e.currentThread;
    const i = null == n;
    null == n && (n = e.domain.attach());
    try {
      const e = t();
      return e instanceof Promise ? await e : e;
    } catch (e) {
      return Script.nextTick((e => {
        throw e;
      }), e), Promise.reject(e);
    } finally {
      i && n.detach();
    }
  };
}(t || (t = {})), function(e) {
  class t {
    static get allocationGranularity() {
      return this.information[5];
    }
    static get information() {
      return e.memorySnapshot(e.Api.memorySnapshotGetRuntimeInformation);
    }
    static get pointerSize() {
      return this.information[0];
    }
    static internalCall(t, n, i) {
      const r = e.Api.resolveInternalCall(Memory.allocUtf8String(t));
      return r.isNull() ? null : new NativeFunction(r, n, i);
    }
  }
  n([ o ], t, "information", null), e.Runtime = t;
}(t || (t = {})), function(e) {
  class t extends c {
    static get headerSize() {
      return e.corlib.class("System.Array").instanceSize;
    }
    get elements() {
      return new e.Pointer(e.Api.arrayGetElements(this), this.elementType);
    }
    get elementSize() {
      return this.elementType.class.arrayElementSize;
    }
    get elementType() {
      return this.object.class.type.class.baseType;
    }
    get length() {
      return e.Api.arrayGetLength(this);
    }
    get object() {
      return new e.Object(this);
    }
    get(e) {
      return (e < 0 || e >= this.length) && i(`cannot get element at index ${e}: array length is ${this.length}`), 
      this.elements.get(e);
    }
    set(e, t) {
      (e < 0 || e >= this.length) && i(`cannot get element at index ${e}: array length is ${this.length}`), 
      this.elements.set(e, t);
    }
    toString() {
      return this.isNull() ? "null" : `[${this.elements.read(this.length, 0)}]`;
    }
    * [Symbol.iterator]() {
      for (let e = 0; e < this.length; e++) yield this.elements.get(e);
    }
  }
  n([ o ], t.prototype, "elements", null), n([ o ], t.prototype, "elementSize", null), 
  n([ o ], t.prototype, "elementType", null), n([ o ], t.prototype, "length", null), 
  n([ o ], t.prototype, "object", null), n([ o ], t, "headerSize", null), e.Array = t, 
  e.array = function(t, n) {
    const i = "number" == typeof n ? n : n.length, r = new e.Array(e.Api.arrayNew(t, i));
    return globalThis.Array.isArray(n) && r.elements.write(n), r;
  };
}(t || (t = {})), function(e) {
  let t = class extends p {
    get image() {
      return new e.Image(e.Api.assemblyGetImage(this));
    }
    get name() {
      return this.image.name.replace(".dll", "");
    }
    get object() {
      return e.corlib.class("System.Reflection.Assembly").method("Load").invoke(e.string(this.name));
    }
  };
  n([ o ], t.prototype, "image", null), n([ o ], t.prototype, "name", null), n([ o ], t.prototype, "object", null), 
  t = n([ m ], t), e.Assembly = t;
}(t || (t = {})), function(e) {
  let t = class extends p {
    get actualInstanceSize() {
      return e.Api.classGetActualInstanceSize(this);
    }
    get arrayClass() {
      return new e.Class(e.Api.classGetArrayClass(this, 1));
    }
    get arrayElementSize() {
      return e.Api.classGetArrayElementSize(this);
    }
    get assemblyName() {
      return e.Api.classGetAssemblyName(this).readUtf8String();
    }
    get declaringClass() {
      const t = e.Api.classGetDeclaringType(this);
      return t.isNull() ? null : new e.Class(t);
    }
    get baseType() {
      const t = e.Api.classGetBaseType(this);
      return t.isNull() ? null : new e.Type(t);
    }
    get elementClass() {
      const t = e.Api.classGetElementClass(this);
      return t.isNull() ? null : new e.Class(t);
    }
    get fields() {
      return h((t => e.Api.classGetFields(this, t))).map((t => new e.Field(t)));
    }
    get flags() {
      return e.Api.classGetFlags(this);
    }
    get fullName() {
      return this.namespace ? `${this.namespace}.${this.name}` : this.name;
    }
    get genericParameterCount() {
      return this.isGeneric ? this.type.object.method("GetGenericArguments").invoke().length : 0;
    }
    get hasReferences() {
      return !!e.Api.classHasReferences(this);
    }
    get hasStaticConstructor() {
      const e = this.tryMethod(".cctor");
      return null != e && !e.virtualAddress.isNull();
    }
    get image() {
      return new e.Image(e.Api.classGetImage(this));
    }
    get instanceSize() {
      return e.Api.classGetInstanceSize(this);
    }
    get isAbstract() {
      return !!e.Api.classIsAbstract(this);
    }
    get isBlittable() {
      return !!e.Api.classIsBlittable(this);
    }
    get isEnum() {
      return !!e.Api.classIsEnum(this);
    }
    get isGeneric() {
      return !!e.Api.classIsGeneric(this);
    }
    get isInflated() {
      return !!e.Api.classIsInflated(this);
    }
    get isInterface() {
      return !!e.Api.classIsInterface(this);
    }
    get isValueType() {
      return !!e.Api.classIsValueType(this);
    }
    get interfaces() {
      return h((t => e.Api.classGetInterfaces(this, t))).map((t => new e.Class(t)));
    }
    get methods() {
      return h((t => e.Api.classGetMethods(this, t))).map((t => new e.Method(t)));
    }
    get name() {
      return e.Api.classGetName(this).readUtf8String();
    }
    get namespace() {
      return e.Api.classGetNamespace(this).readUtf8String();
    }
    get nestedClasses() {
      return h((t => e.Api.classGetNestedClasses(this, t))).map((t => new e.Class(t)));
    }
    get parent() {
      const t = e.Api.classGetParent(this);
      return t.isNull() ? null : new e.Class(t);
    }
    get rank() {
      return e.Api.classGetRank(this);
    }
    get staticFieldsData() {
      return e.Api.classGetStaticFieldData(this);
    }
    get valueSize() {
      return e.Api.classGetValueSize(this, NULL);
    }
    get type() {
      return new e.Type(e.Api.classGetType(this));
    }
    alloc() {
      return new e.Object(e.Api.objectNew(this));
    }
    field(e) {
      return this.tryField(e) ?? i(`couldn't find field ${e} in class ${this.type.name}`);
    }
    inflate(...t) {
      this.isGeneric || i(`cannot inflate class ${this.type.name}: it has no generic parameters`), 
      this.genericParameterCount != t.length && i(`cannot inflate class ${this.type.name}: it needs ${this.genericParameterCount} generic parameter(s), not ${t.length}`);
      const n = t.map((e => e.type.object)), r = e.array(e.corlib.class("System.Type"), n), s = this.type.object.method("MakeGenericType", 1).invoke(r);
      return new e.Class(e.Api.classFromSystemType(s));
    }
    initialize() {
      e.Api.classInit(this);
    }
    isAssignableFrom(t) {
      return !!e.Api.classIsAssignableFrom(this, t);
    }
    isSubclassOf(t, n) {
      return !!e.Api.classIsSubclassOf(this, t, +n);
    }
    method(e, t = -1) {
      return this.tryMethod(e, t) ?? i(`couldn't find method ${e} in class ${this.type.name}`);
    }
    nested(e) {
      return this.tryNested(e) ?? i(`couldn't find nested class ${e} in class ${this.type.name}`);
    }
    new() {
      const t = this.alloc(), n = Memory.alloc(Process.pointerSize);
      e.Api.objectInit(t, n);
      const r = n.readPointer();
      return r.isNull() || i(new e.Object(r).toString()), t;
    }
    tryField(t) {
      const n = e.Api.classGetFieldFromName(this, Memory.allocUtf8String(t));
      return n.isNull() ? null : new e.Field(n);
    }
    tryMethod(t, n = -1) {
      const i = e.Api.classGetMethodFromName(this, Memory.allocUtf8String(t), n);
      return i.isNull() ? null : new e.Method(i);
    }
    tryNested(e) {
      return this.nestedClasses.find((t => t.name == e));
    }
    toString() {
      const e = [ this.parent ].concat(this.interfaces);
      return `// ${this.assemblyName}\n${this.isEnum ? "enum" : this.isValueType ? "struct" : this.isInterface ? "interface" : "class"} ${this.type.name}${e ? ` : ${e.map((e => e?.type.name)).join(", ")}` : ""}\n{\n    ${this.fields.join("\n    ")}\n    ${this.methods.join("\n    ")}\n}`;
    }
    static enumerate(t) {
      const n = new NativeCallback((n => t(new e.Class(n))), "void", [ "pointer", "pointer" ]);
      return e.Api.classForEach(n, NULL);
    }
  };
  n([ o ], t.prototype, "actualInstanceSize", null), n([ o ], t.prototype, "arrayClass", null), 
  n([ o ], t.prototype, "arrayElementSize", null), n([ o ], t.prototype, "assemblyName", null), 
  n([ o ], t.prototype, "declaringClass", null), n([ o ], t.prototype, "baseType", null), 
  n([ o ], t.prototype, "elementClass", null), n([ o ], t.prototype, "fields", null), 
  n([ o ], t.prototype, "flags", null), n([ o ], t.prototype, "fullName", null), n([ o ], t.prototype, "genericParameterCount", null), 
  n([ o ], t.prototype, "hasReferences", null), n([ o ], t.prototype, "hasStaticConstructor", null), 
  n([ o ], t.prototype, "image", null), n([ o ], t.prototype, "instanceSize", null), 
  n([ o ], t.prototype, "isAbstract", null), n([ o ], t.prototype, "isBlittable", null), 
  n([ o ], t.prototype, "isEnum", null), n([ o ], t.prototype, "isGeneric", null), 
  n([ o ], t.prototype, "isInflated", null), n([ o ], t.prototype, "isInterface", null), 
  n([ o ], t.prototype, "isValueType", null), n([ o ], t.prototype, "interfaces", null), 
  n([ o ], t.prototype, "methods", null), n([ o ], t.prototype, "name", null), n([ o ], t.prototype, "namespace", null), 
  n([ o ], t.prototype, "nestedClasses", null), n([ o ], t.prototype, "parent", null), 
  n([ o ], t.prototype, "rank", null), n([ o ], t.prototype, "staticFieldsData", null), 
  n([ o ], t.prototype, "valueSize", null), n([ o ], t.prototype, "type", null), t = n([ m ], t), 
  e.Class = t, e._delegateNativeCallbacks = {};
}(t || (t = {})), function(e) {
  e.delegate = function(t, n) {
    const r = e.corlib.class("System.Delegate"), s = e.corlib.class("System.MulticastDelegate");
    r.isAssignableFrom(t) || i(`cannot create a delegate for ${t.type.name} as it's a non-delegate class`), 
    (t.equals(r) || t.equals(s)) && i(`cannot create a delegate for neither ${r.type.name} nor ${s.type.name}, use a subclass instead`);
    const a = t.alloc(), l = a.handle.toString(), o = a.tryMethod("Invoke") ?? i(`cannot create a delegate for ${t.type.name}, there is no Invoke method`);
    a.method(".ctor").invoke(a, o.handle);
    const c = o.wrap(((...t) => (delete e._delegateNativeCallbacks[l], n(...t))));
    return a.field("method_ptr").value = c, a.field("invoke_impl").value = c, e._delegateNativeCallbacks[l] = c, 
    a;
  };
}(t || (t = {})), function(e) {
  let t = class extends p {
    get assemblies() {
      let t = _((t => e.Api.domainGetAssemblies(this, t)));
      if (0 == t.length) {
        const e = this.object.method("GetAssemblies").overload().invoke();
        t = globalThis.Array.from(e).map((e => e.field("_mono_assembly").value));
      }
      return t.map((t => new e.Assembly(t)));
    }
    get object() {
      return new e.Object(e.Api.domainGetObject());
    }
    assembly(e) {
      return this.tryAssembly(e) ?? i(`couldn't find assembly ${e}`);
    }
    attach() {
      return new e.Thread(e.Api.threadAttach(this));
    }
    tryAssembly(t) {
      const n = e.Api.domainAssemblyOpen(this, Memory.allocUtf8String(t));
      return n.isNull() ? null : new e.Assembly(n);
    }
  };
  n([ o ], t.prototype, "assemblies", null), n([ o ], t.prototype, "object", null), 
  t = n([ m ], t), e.Domain = t, l(e, "domain", (() => new e.Domain(e.Api.domainGet())), o);
}(t || (t = {})), function(e) {
  class t extends p {
    get class() {
      return new e.Class(e.Api.fieldGetClass(this));
    }
    get flags() {
      return e.Api.fieldGetFlags(this);
    }
    get isLiteral() {
      return !!e.Api.fieldIsLiteral(this);
    }
    get isStatic() {
      return !!e.Api.fieldIsStatic(this);
    }
    get isThreadStatic() {
      return !!e.Api.fieldIsThreadStatic(this);
    }
    get modifier() {
      return e.Api.fieldGetModifier(this).readUtf8String();
    }
    get name() {
      return e.Api.fieldGetName(this).readUtf8String();
    }
    get offset() {
      return e.Api.fieldGetOffset(this);
    }
    get type() {
      return new e.Type(e.Api.fieldGetType(this));
    }
    get value() {
      const t = Memory.alloc(Process.pointerSize);
      return e.Api.fieldGetStaticValue(this.handle, t), e.read(t, this.type);
    }
    set value(t) {
      (this.isThreadStatic || this.isLiteral) && i(`cannot modify the value of field ${this.name}: is thread static or literal`);
      const n = Memory.alloc(Process.pointerSize);
      e.write(n, t, this.type), e.Api.fieldSetStaticValue(this.handle, n);
    }
    toString() {
      return `${this.isThreadStatic ? "[ThreadStatic] " : ""}${this.isStatic ? "static " : ""}${this.type.name} ${this.name}${this.isLiteral ? ` = ${this.type.class.isEnum ? e.read(this.value.handle, this.type.class.baseType) : this.value}` : ""};${this.isThreadStatic || this.isLiteral ? "" : ` // 0x${this.offset.toString(16)}`}`;
    }
    withHolder(t) {
      let n = t.handle.add(this.offset);
      return t instanceof e.ValueType && (n = n.sub(e.Object.headerSize)), new Proxy(this, {
        get: (t, i) => "value" == i ? e.read(n, t.type) : Reflect.get(t, i),
        set: (t, i, r) => "value" == i ? (e.write(n, r, t.type), !0) : Reflect.set(t, i, r)
      });
    }
  }
  n([ o ], t.prototype, "class", null), n([ o ], t.prototype, "flags", null), n([ o ], t.prototype, "isLiteral", null), 
  n([ o ], t.prototype, "isStatic", null), n([ o ], t.prototype, "isThreadStatic", null), 
  n([ o ], t.prototype, "modifier", null), n([ o ], t.prototype, "name", null), n([ o ], t.prototype, "offset", null), 
  n([ o ], t.prototype, "type", null), e.Field = t;
}(t || (t = {})), function(e) {
  e.GCHandle = class {
    handle;
    constructor(e) {
      this.handle = e;
    }
    get target() {
      const t = e.Api.gcHandleGetTarget(this.handle);
      return t.isNull() ? null : new e.Object(t);
    }
    free() {
      return e.Api.gcHandleFree(this.handle);
    }
  };
}(t || (t = {})), function(e) {
  let t = class extends p {
    get assembly() {
      return new e.Assembly(e.Api.imageGetAssembly(this));
    }
    get classCount() {
      return e.Api.imageGetClassCount(this);
    }
    get classes() {
      if (e.unityVersionIsBelow201830) {
        const t = this.assembly.object.method("GetTypes").invoke(!1);
        return globalThis.Array.from(t).map((t => new e.Class(e.Api.classFromSystemType(t))));
      }
      return globalThis.Array.from(globalThis.Array(this.classCount), ((t, n) => new e.Class(e.Api.imageGetClass(this, n))));
    }
    get name() {
      return e.Api.imageGetName(this).readUtf8String();
    }
    class(e) {
      return this.tryClass(e) ?? i(`couldn't find class ${e} in assembly ${this.name}`);
    }
    tryClass(t) {
      const n = t.lastIndexOf("."), i = Memory.allocUtf8String(-1 == n ? "" : t.slice(0, n)), r = Memory.allocUtf8String(t.slice(n + 1)), s = e.Api.classFromName(this, i, r);
      return s.isNull() ? null : new e.Class(s);
    }
  };
  n([ o ], t.prototype, "assembly", null), n([ o ], t.prototype, "classCount", null), 
  n([ o ], t.prototype, "classes", null), n([ o ], t.prototype, "name", null), t = n([ m ], t), 
  e.Image = t, l(e, "corlib", (() => new e.Image(e.Api.getCorlib())), o);
}(t || (t = {})), function(e) {
  class t extends p {
    static capture() {
      return new e.MemorySnapshot;
    }
    constructor(t = e.Api.memorySnapshotCapture()) {
      super(t);
    }
    get classes() {
      return h((t => e.Api.memorySnapshotGetClasses(this, t))).map((t => new e.Class(t)));
    }
    get objects() {
      return _((t => e.Api.memorySnapshotGetObjects(this, t))).filter((e => !e.isNull())).map((t => new e.Object(t)));
    }
    free() {
      e.Api.memorySnapshotFree(this);
    }
  }
  n([ o ], t.prototype, "classes", null), n([ o ], t.prototype, "objects", null), 
  e.MemorySnapshot = t, e.memorySnapshot = function(t) {
    const n = e.MemorySnapshot.capture(), i = t(n);
    return n.free(), i;
  };
}(t || (t = {})), function(e) {
  class t extends p {
    get class() {
      return new e.Class(e.Api.methodGetClass(this));
    }
    get flags() {
      return e.Api.methodGetFlags(this, NULL);
    }
    get implementationFlags() {
      const t = Memory.alloc(Process.pointerSize);
      return e.Api.methodGetFlags(this, t), t.readU32();
    }
    get fridaSignature() {
      const t = [];
      for (const e of this.parameters) t.push(e.type.fridaAlias);
      return this.isStatic && !e.unityVersionIsBelow201830 || t.unshift("pointer"), this.isInflated && t.push("pointer"), 
      t;
    }
    get genericParameterCount() {
      return this.isGeneric ? this.object.method("GetGenericArguments").invoke().length : 0;
    }
    get isExternal() {
      return !!e.Api.methodIsExternal(this);
    }
    get isGeneric() {
      return !!e.Api.methodIsGeneric(this);
    }
    get isInflated() {
      return !!e.Api.methodIsInflated(this);
    }
    get isStatic() {
      return !e.Api.methodIsInstance(this);
    }
    get isSynchronized() {
      return !!e.Api.methodIsSynchronized(this);
    }
    get modifier() {
      return e.Api.methodGetModifier(this).readUtf8String();
    }
    get name() {
      return e.Api.methodGetName(this).readUtf8String();
    }
    get nativeFunction() {
      return new NativeFunction(this.virtualAddress, this.returnType.fridaAlias, this.fridaSignature);
    }
    get object() {
      return new e.Object(e.Api.methodGetObject(this, NULL));
    }
    get parameterCount() {
      return e.Api.methodGetParameterCount(this);
    }
    get parameters() {
      return globalThis.Array.from(globalThis.Array(this.parameterCount), ((t, n) => {
        const i = e.Api.methodGetParameterName(this, n).readUtf8String(), r = e.Api.methodGetParameterType(this, n);
        return new e.Parameter(i, n, new e.Type(r));
      }));
    }
    get relativeVirtualAddress() {
      return this.virtualAddress.sub(e.module.base);
    }
    get returnType() {
      return new e.Type(e.Api.methodGetReturnType(this));
    }
    get virtualAddress() {
      return e.Api.methodGetPointer(this);
    }
    set implementation(e) {
      try {
        Interceptor.replace(this.virtualAddress, this.wrap(e));
      } catch (e) {
        switch (e.message) {
         case "access violation accessing 0x0":
          i(`cannot implement method ${this.name}: it has a NULL virtual address`);

         case `unable to intercept function at ${this.virtualAddress}; please file a bug`:
          r(`cannot implement method ${this.name}: it may be a thunk`);
          break;

         case "already replaced this function":
          r(`cannot implement method ${this.name}: already replaced by a thunk`);
          break;

         default:
          throw e;
        }
      }
    }
    inflate(...t) {
      this.isGeneric || i(`cannot inflate method ${this.name}: it has no generic parameters`), 
      this.genericParameterCount != t.length && i(`cannot inflate method ${this.name}: it needs ${this.genericParameterCount} generic parameter(s), not ${t.length}`);
      const n = t.map((e => e.type.object)), r = e.array(e.corlib.class("System.Type"), n), s = this.object.method("MakeGenericMethod", 1).invoke(r);
      return new e.Method(e.Api.methodGetFromReflection(s));
    }
    invoke(...e) {
      return this.isStatic || i(`cannot invoke a non-static method ${this.name}: must be invoked throught a Il2Cpp.Object, not a Il2Cpp.Class`), 
      this.invokeRaw(NULL, ...e);
    }
    invokeRaw(t, ...n) {
      const r = n.map(e.toFridaValue);
      this.isStatic && !e.unityVersionIsBelow201830 || r.unshift(t), this.isInflated && r.push(this.handle);
      try {
        const t = this.nativeFunction(...r);
        return e.fromFridaValue(t, this.returnType);
      } catch (e) {
        switch (null == e && i("an unexpected native function exception occurred, this is due to parameter types mismatch"), 
        e.message) {
         case "bad argument count":
          i(`cannot invoke method ${this.name}: it needs ${this.parameterCount} parameter(s), not ${n.length}`);

         case "expected a pointer":
         case "expected number":
         case "expected array with fields":
          i(`cannot invoke method ${this.name}: parameter types mismatch`);
        }
        throw e;
      }
    }
    overload(...e) {
      const t = this.tryOverload(...e);
      if (null != t) return t;
      i(`cannot find overloaded method ${this.name}(${e})`);
    }
    parameter(e) {
      return this.tryParameter(e) ?? i(`couldn't find parameter ${e} in method ${this.name}`);
    }
    revert() {
      Interceptor.revert(this.virtualAddress), Interceptor.flush();
    }
    tryOverload(...e) {
      return this.class.methods.find((t => t.name == this.name && t.parameterCount == e.length && t.parameters.every(((t, n) => t.type.name == e[n]))));
    }
    tryParameter(e) {
      return this.parameters.find((t => t.name == e));
    }
    toString() {
      return `${this.isStatic ? "static " : ""}${this.returnType.name} ${this.name}(${this.parameters.join(", ")});${this.virtualAddress.isNull() ? "" : ` // 0x${this.relativeVirtualAddress.toString(16).padStart(8, "0")}`}`;
    }
    withHolder(e) {
      return new Proxy(this, {
        get(t, n) {
          switch (n) {
           case "invoke":
            return t.invokeRaw.bind(t, e.handle);

           case "inflate":
           case "overload":
           case "tryOverload":
            return function(...i) {
              return t[n](...i)?.withHolder(e);
            };
          }
          return Reflect.get(t, n);
        }
      });
    }
    wrap(t) {
      const n = +!this.isStatic | +e.unityVersionIsBelow201830;
      return new NativeCallback(((...i) => {
        const r = this.isStatic ? this.class : new e.Object(i[0]), s = this.parameters.map(((t, r) => e.fromFridaValue(i[r + n], t.type))), a = t.call(r, ...s);
        return e.toFridaValue(a);
      }), this.returnType.fridaAlias, this.fridaSignature);
    }
  }
  n([ o ], t.prototype, "class", null), n([ o ], t.prototype, "flags", null), n([ o ], t.prototype, "implementationFlags", null), 
  n([ o ], t.prototype, "fridaSignature", null), n([ o ], t.prototype, "genericParameterCount", null), 
  n([ o ], t.prototype, "isExternal", null), n([ o ], t.prototype, "isGeneric", null), 
  n([ o ], t.prototype, "isInflated", null), n([ o ], t.prototype, "isStatic", null), 
  n([ o ], t.prototype, "isSynchronized", null), n([ o ], t.prototype, "modifier", null), 
  n([ o ], t.prototype, "name", null), n([ o ], t.prototype, "nativeFunction", null), 
  n([ o ], t.prototype, "object", null), n([ o ], t.prototype, "parameterCount", null), 
  n([ o ], t.prototype, "parameters", null), n([ o ], t.prototype, "relativeVirtualAddress", null), 
  n([ o ], t.prototype, "returnType", null), n([ o ], t.prototype, "virtualAddress", null), 
  e.Method = t;
}(t || (t = {})), function(e) {
  class t extends c {
    static get headerSize() {
      return e.corlib.class("System.Object").instanceSize;
    }
    get class() {
      return new e.Class(e.Api.objectGetClass(this));
    }
    get size() {
      return e.Api.objectGetSize(this);
    }
    enter() {
      return e.Api.monitorEnter(this);
    }
    exit() {
      return e.Api.monitorExit(this);
    }
    field(e) {
      return this.class.field(e).withHolder(this);
    }
    method(e, t = -1) {
      return this.class.method(e, t).withHolder(this);
    }
    pulse() {
      return e.Api.monitorPulse(this);
    }
    pulseAll() {
      return e.Api.monitorPulseAll(this);
    }
    ref(t) {
      return new e.GCHandle(e.Api.gcHandleNew(this, +t));
    }
    virtualMethod(t) {
      return new e.Method(e.Api.objectGetVirtualMethod(this, t)).withHolder(this);
    }
    tryEnter(t) {
      return !!e.Api.monitorTryEnter(this, t);
    }
    tryField(e) {
      return this.class.tryField(e)?.withHolder(this);
    }
    tryMethod(e, t = -1) {
      return this.class.tryMethod(e, t)?.withHolder(this);
    }
    tryWait(t) {
      return !!e.Api.monitorTryWait(this, t);
    }
    toString() {
      return this.isNull() ? "null" : this.method("ToString").invoke().content ?? "null";
    }
    unbox() {
      return new e.ValueType(e.Api.objectUnbox(this), this.class.type);
    }
    wait() {
      return e.Api.monitorWait(this);
    }
    weakRef(t) {
      return new e.GCHandle(e.Api.gcHandleNewWeakRef(this, +t));
    }
  }
  n([ o ], t.prototype, "class", null), n([ o ], t.prototype, "size", null), n([ o ], t, "headerSize", null), 
  e.Object = t;
}(t || (t = {})), function(e) {
  e.Parameter = class {
    name;
    position;
    type;
    constructor(e, t, n) {
      this.name = e, this.position = t, this.type = n;
    }
    toString() {
      return `${this.type.name} ${this.name}`;
    }
  };
}(t || (t = {})), function(e) {
  e.Pointer = class extends c {
    type;
    constructor(e, t) {
      super(e), this.type = t;
    }
    get(t) {
      return e.read(this.handle.add(t * this.type.class.arrayElementSize), this.type);
    }
    read(e, t = 0) {
      const n = new globalThis.Array(e);
      for (let i = 0; i < e; i++) n[i] = this.get(i + t);
      return n;
    }
    set(t, n) {
      e.write(this.handle.add(t * this.type.class.arrayElementSize), n, this.type);
    }
    toString() {
      return this.handle.toString();
    }
    write(e, t = 0) {
      for (let n = 0; n < e.length; n++) this.set(n + t, e[n]);
    }
  };
}(t || (t = {})), function(e) {
  e.Reference = class extends c {
    type;
    constructor(e, t) {
      super(e), this.type = t;
    }
    get value() {
      return e.read(this.handle, this.type);
    }
    set value(t) {
      e.write(this.handle, t, this.type);
    }
    toString() {
      return this.isNull() ? "null" : `->${this.value}`;
    }
  }, e.reference = function(t, n) {
    const r = Memory.alloc(Process.pointerSize);
    switch (typeof t) {
     case "boolean":
      return new e.Reference(r.writeS8(+t), e.corlib.class("System.Boolean").type);

     case "number":
      switch (n?.typeEnum) {
       case 5:
        return new e.Reference(r.writeU8(t), n);

       case 4:
        return new e.Reference(r.writeS8(t), n);

       case 3:
       case 7:
        return new e.Reference(r.writeU16(t), n);

       case 6:
        return new e.Reference(r.writeS16(t), n);

       case 9:
        return new e.Reference(r.writeU32(t), n);

       case 8:
        return new e.Reference(r.writeS32(t), n);

       case 11:
        return new e.Reference(r.writeU64(t), n);

       case 10:
        return new e.Reference(r.writeS64(t), n);

       case 12:
        return new e.Reference(r.writeFloat(t), n);

       case 13:
        return new e.Reference(r.writeDouble(t), n);
      }

     case "object":
      if (t instanceof e.ValueType || t instanceof e.Pointer) return new e.Reference(r.writePointer(t), t.type);
      if (t instanceof e.Object) return new e.Reference(r.writePointer(t), t.class.type);
      if (t instanceof e.String || t instanceof e.Array) return new e.Reference(r.writePointer(t), t.object.class.type);
      if (t instanceof NativePointer) switch (n?.typeEnum) {
       case 25:
       case 24:
        return new e.Reference(r.writePointer(t), n);
      } else {
        if (t instanceof Int64) return new e.Reference(r.writeS64(t), e.corlib.class("System.Int64").type);
        if (t instanceof UInt64) return new e.Reference(r.writeU64(t), e.corlib.class("System.UInt64").type);
      }

     default:
      i(`don't know how to create a reference to ${t} using type ${n?.name}`);
    }
  };
}(t || (t = {})), function(e) {
  e.String = class extends c {
    get content() {
      return e.Api.stringChars(this).readUtf16String(this.length);
    }
    set content(t) {
      e.Api.stringChars(this).writeUtf16String(t ?? ""), e.Api.stringSetLength(this, t?.length ?? 0);
    }
    get length() {
      return e.Api.stringLength(this);
    }
    get object() {
      return new e.Object(this);
    }
    toString() {
      return this.isNull() ? "null" : `"${this.content}"`;
    }
  }, e.string = function(t) {
    return new e.String(e.Api.stringNew(Memory.allocUtf8String(t || "")));
  };
}(t || (t = {})), function(e) {
  class t extends c {
    static get idOffset() {
      const t = ptr(e.currentThread.internal.field("thread_id").value.toString()), n = Process.getCurrentThreadId();
      for (let e = 0; e < 1024; e++) try {
        if (t.add(e).readS32() == n) return e;
      } catch (e) {}
      i("couldn't determine the offset for a native thread id value");
    }
    get id() {
      return ptr(this.internal.field("thread_id").value.toString()).add(e.Thread.idOffset).readS32();
    }
    get internal() {
      return this.object.tryField("internal_thread")?.value ?? this.object;
    }
    get isFinalizer() {
      return !e.Api.threadIsVm(this);
    }
    get managedId() {
      return this.object.method("get_ManagedThreadId").invoke();
    }
    get object() {
      return new e.Object(this);
    }
    get staticData() {
      return this.internal.field("static_data").value;
    }
    get synchronizationContext() {
      const t = (this.object.tryMethod("GetMutableExecutionContext") || this.object.method("get_ExecutionContext")).invoke();
      let n = t.tryField("_syncContext")?.value ?? t.tryMethod("get_SynchronizationContext")?.invoke();
      if (null == n) {
        const t = e.corlib.class("System.Threading.SynchronizationContext");
        for (let i = 0; i < 16; i++) try {
          const r = new e.Object(this.staticData.add(Process.pointerSize * i).readPointer().readPointer());
          if (r.class.isSubclassOf(t, !1)) {
            n = r;
            break;
          }
        } catch (e) {}
      }
      return (null == n || n.isNull()) && i("couldn't retrieve the SynchronizationContext for this thread."), 
      n;
    }
    detach() {
      return e.Api.threadDetach(this);
    }
    schedule(t, n = 0) {
      return new Promise((i => {
        const r = e.delegate(e.corlib.class("System.Threading.SendOrPostCallback"), (() => {
          const e = t();
          setImmediate((() => i(e)));
        }));
        setTimeout((() => this.synchronizationContext.method("Post").invoke(r, NULL)), n);
      }));
    }
  }
  n([ o ], t.prototype, "id", null), n([ o ], t.prototype, "internal", null), n([ o ], t.prototype, "isFinalizer", null), 
  n([ o ], t.prototype, "managedId", null), n([ o ], t.prototype, "object", null), 
  n([ o ], t.prototype, "staticData", null), n([ o ], t.prototype, "synchronizationContext", null), 
  n([ o ], t, "idOffset", null), e.Thread = t, l(e, "attachedThreads", (() => _(e.Api.threadGetAllAttachedThreads).map((t => new e.Thread(t))))), 
  l(e, "currentThread", (() => {
    const t = e.Api.threadCurrent();
    return t.isNull() ? null : new e.Thread(t);
  })), l(e, "mainThread", (() => e.attachedThreads[0]));
}(t || (t = {})), function(e) {
  class t extends p {
    get class() {
      return new e.Class(e.Api.classFromType(this));
    }
    get fridaAlias() {
      if (this.isByReference) return "pointer";
      switch (this.typeEnum) {
       case 1:
        return "void";

       case 2:
        return "bool";

       case 3:
        return "uchar";

       case 4:
        return "int8";

       case 5:
        return "uint8";

       case 6:
        return "int16";

       case 7:
        return "uint16";

       case 8:
        return "int32";

       case 9:
        return "uint32";

       case 10:
        return "int64";

       case 11:
        return "uint64";

       case 12:
        return "float";

       case 13:
        return "double";

       case 17:
        return i(this);

       case 24:
       case 25:
       case 15:
       case 14:
       case 29:
       case 20:
       default:
        return "pointer";

       case 18:
       case 28:
       case 21:
        return this.class.isValueType ? i(this) : "pointer";
      }
    }
    get isByReference() {
      return !!e.Api.typeIsByReference(this);
    }
    get isPrimitive() {
      return !!e.Api.typeIsPrimitive(this);
    }
    get name() {
      const t = e.Api.typeGetName(this);
      try {
        return t.readUtf8String();
      } finally {
        e.free(t);
      }
    }
    get object() {
      return new e.Object(e.Api.typeGetObject(this));
    }
    get typeEnum() {
      return e.Api.typeGetTypeEnum(this);
    }
    toString() {
      return this.name;
    }
  }
  function i(e) {
    const t = e.class.fields.filter((e => !e.isStatic));
    return 0 == t.length ? [ "char" ] : t.map((e => e.type.fridaAlias));
  }
  n([ o ], t.prototype, "class", null), n([ o ], t.prototype, "fridaAlias", null), 
  n([ o ], t.prototype, "isByReference", null), n([ o ], t.prototype, "isPrimitive", null), 
  n([ o ], t.prototype, "name", null), n([ o ], t.prototype, "object", null), n([ o ], t.prototype, "typeEnum", null), 
  e.Type = t;
}(t || (t = {})), function(e) {
  e.ValueType = class extends c {
    type;
    constructor(e, t) {
      super(e), this.type = t;
    }
    box() {
      return new e.Object(e.Api.valueBox(this.type.class, this));
    }
    field(e) {
      return this.type.class.field(e).withHolder(this);
    }
    toString() {
      return this.isNull() ? "null" : this.box().toString();
    }
  };
}(t || (t = {})), function(e) {
  e.AbstractTracer = class {
    targets=[];
    #e;
    #t;
    #n;
    #i;
    #r;
    #s;
    #a;
    domain() {
      return this;
    }
    assemblies(...e) {
      return this.#e = e, this;
    }
    classes(...e) {
      return this.#t = e, this;
    }
    methods(...e) {
      return this.#n = e, this;
    }
    filterAssemblies(e) {
      return this.#i = e, this;
    }
    filterClasses(e) {
      return this.#r = e, this;
    }
    filterMethods(e) {
      return this.#s = e, this;
    }
    filterParameters(e) {
      return this.#a = e, this;
    }
    and() {
      const t = e => {
        if (null != this.#a) {
          for (const t of e.parameters) if (this.#a(t)) {
            this.targets.push(e);
            break;
          }
        } else this.targets.push(e);
      }, n = e => {
        for (const n of e) t(n);
      }, i = e => {
        if (null != this.#s) for (const n of e.methods) this.#s(n) && t(n); else n(e.methods);
      }, r = e => {
        for (const t of e) i(t);
      }, s = e => {
        if (null != this.#r) for (const t of e.image.classes) this.#r(t) && i(t); else r(e.image.classes);
      }, a = e => {
        for (const t of e) s(t);
      };
      return this.#n ? n(this.#n) : this.#t ? r(this.#t) : this.#e ? a(this.#e) : (e => {
        if (null != this.#i) for (const t of e.assemblies) this.#i(t) && s(t); else a(e.assemblies);
      })(e.domain), this.#e = void 0, this.#t = void 0, this.#n = void 0, this.#i = void 0, 
      this.#r = void 0, this.#s = void 0, this.#a = void 0, this;
    }
  };
}(t || (t = {})), function(e) {
  class t extends e.AbstractTracer {
    mode;
    isVerbose=!0;
    methodList=e.domain.assemblies.flatMap((e => e.image.classes.flatMap((e => e.methods.filter((e => !e.virtualAddress.isNull())))))).sort(((e, t) => e.virtualAddress.compare(t.virtualAddress)));
    strategy(e) {
      return this.mode = globalThis.Backtracer[e.toUpperCase()], this;
    }
    verbose(e) {
      return this.isVerbose = e, this;
    }
    attach() {
      const t = this, n = this.isVerbose ? void 0 : new Set;
      for (const i of this.targets) if (!i.virtualAddress.isNull()) try {
        Interceptor.attach(i.virtualAddress, (function() {
          let r = globalThis.Thread.backtrace(this.context, t.mode).reverse();
          if (r.push(i.virtualAddress), !t.isVerbose) {
            const e = r.map((e => e.toString())).join("");
            if (n?.has(e)) return;
            n?.add(e);
          }
          let s = 0;
          for (const n of r) {
            const i = n >= e.module.base && n < e.module.base.add(e.module.size) ? t.searchInsert(n) : void 0, r = 0 == s ? "" : `${" ".repeat(2 * (s - 1))}└─`;
            if (null != i) {
              {
                const e = n.sub(i.virtualAddress);
                if (n.sub(i.virtualAddress).compare(4095) > 0) continue;
                a(`[2m0x${i.relativeVirtualAddress.toString(16).padStart(8, "0")}+0x${e.toString(16).padStart(3, "0")}[0m ${r}${i.class.type.name}.[1m${i.name}[0m`);
              }
              s++;
            }
          }
        }));
      } catch (e) {}
    }
    searchInsert(e) {
      let t = 0, n = this.methodList.length - 1;
      for (;t <= n; ) {
        const i = Math.floor((t + n) / 2), r = this.methodList[i].virtualAddress.compare(e);
        if (0 == r) return this.methodList[i];
        r > 0 ? n = i - 1 : t = i + 1;
      }
      return this.methodList[n];
    }
  }
  e.Backtracer = t, e.backtrace = function() {
    return new e.Backtracer;
  };
}(t || (t = {})), function(e) {
  class t extends e.AbstractTracer {
    withParameters=!1;
    parameters(e) {
      return this.withParameters = e, this;
    }
    attach() {
      let t = 0;
      for (const n of this.targets) {
        if (n.virtualAddress.isNull()) continue;
        const i = `[2m0x${n.relativeVirtualAddress.toString(16).padStart(8, "0")}[0m`, r = `${n.class.type.name}.[1m${n.name}[0m`;
        if (this.withParameters) {
          const s = +!n.isStatic | +e.unityVersionIsBelow201830, l = (...l) => {
            const o = n.isStatic ? void 0 : new e.Parameter("this", -1, n.class.type), c = o ? [ o ].concat(n.parameters) : n.parameters;
            a(`${i} ${"│ ".repeat(t++)}┌─[35m${r}[0m(${c.map((t => `[32m${t.name}[0m = [31m${e.fromFridaValue(l[t.position + s], t.type)}[0m`)).join(", ")});`);
            const p = n.nativeFunction(...l);
            return a(`${i} ${"│ ".repeat(--t)}└─[33m${r}[0m${null == p ? "" : ` = [36m${e.fromFridaValue(p, n.returnType)}`}[0m;`), 
            p;
          };
          try {
            n.revert();
            const e = new NativeCallback(l, n.returnType.fridaAlias, n.fridaSignature);
            Interceptor.replace(n.virtualAddress, e);
          } catch (e) {}
        } else try {
          Interceptor.attach(n.virtualAddress, {
            onEnter: () => a(`${i} ${"│ ".repeat(t++)}┌─[35m${r}[0m`),
            onLeave: () => a(`${i} ${"│ ".repeat(--t)}└─[33m${r}[0m${0 == t ? "\n" : ""}`)
          });
        } catch (e) {}
      }
    }
  }
  e.Tracer = t, e.trace = function() {
    return new e.Tracer;
  };
}(t || (t = {})), globalThis.Il2Cpp = t;

}).call(this)}).call(this,require("timers").setImmediate)

},{"timers":5}],4:[function(require,module,exports){
var t, e, n = module.exports = {};

function r() {
  throw new Error("setTimeout has not been defined");
}

function o() {
  throw new Error("clearTimeout has not been defined");
}

function i(e) {
  if (t === setTimeout) return setTimeout(e, 0);
  if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
  try {
    return t(e, 0);
  } catch (n) {
    try {
      return t.call(null, e, 0);
    } catch (n) {
      return t.call(this, e, 0);
    }
  }
}

function u(t) {
  if (e === clearTimeout) return clearTimeout(t);
  if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t);
  try {
    return e(t);
  } catch (n) {
    try {
      return e.call(null, t);
    } catch (n) {
      return e.call(this, t);
    }
  }
}

!function() {
  try {
    t = "function" == typeof setTimeout ? setTimeout : r;
  } catch (e) {
    t = r;
  }
  try {
    e = "function" == typeof clearTimeout ? clearTimeout : o;
  } catch (t) {
    e = o;
  }
}();

var c, s = [], l = !1, a = -1;

function f() {
  l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h());
}

function h() {
  if (!l) {
    var t = i(f);
    l = !0;
    for (var e = s.length; e; ) {
      for (c = s, s = []; ++a < e; ) c && c[a].run();
      a = -1, e = s.length;
    }
    c = null, l = !1, u(t);
  }
}

function m(t, e) {
  this.fun = t, this.array = e;
}

function p() {}

n.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
  s.push(new m(t, e)), 1 !== s.length || l || i(h);
}, m.prototype.run = function() {
  this.fun.apply(null, this.array);
}, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", 
n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, 
n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, 
n.listeners = function(t) {
  return [];
}, n.binding = function(t) {
  throw new Error("process.binding is not supported");
}, n.cwd = function() {
  return "/";
}, n.chdir = function(t) {
  throw new Error("process.chdir is not supported");
}, n.umask = function() {
  return 0;
};

},{}],5:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var e = require("process/browser.js").nextTick, t = Function.prototype.apply, o = Array.prototype.slice, i = {}, n = 0;

function r(e, t) {
  this._id = e, this._clearFn = t;
}

exports.setTimeout = function() {
  return new r(t.call(setTimeout, window, arguments), clearTimeout);
}, exports.setInterval = function() {
  return new r(t.call(setInterval, window, arguments), clearInterval);
}, exports.clearTimeout = exports.clearInterval = function(e) {
  e.close();
}, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
  this._clearFn.call(window, this._id);
}, exports.enroll = function(e, t) {
  clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
}, exports.unenroll = function(e) {
  clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
}, exports._unrefActive = exports.active = function(e) {
  clearTimeout(e._idleTimeoutId);
  var t = e._idleTimeout;
  t >= 0 && (e._idleTimeoutId = setTimeout((function() {
    e._onTimeout && e._onTimeout();
  }), t));
}, exports.setImmediate = "function" == typeof setImmediate ? setImmediate : function(t) {
  var r = n++, l = !(arguments.length < 2) && o.call(arguments, 1);
  return i[r] = !0, e((function() {
    i[r] && (l ? t.apply(null, l) : t.call(null), exports.clearImmediate(r));
  })), r;
}, exports.clearImmediate = "function" == typeof clearImmediate ? clearImmediate : function(e) {
  delete i[e];
};

}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":4,"timers":5}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC50cyIsIm1haW4uanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7SUNBQSxRQUFBOztBQUNBLE1BQUEsSUFBQSxRQUFBOztBQUNBLGFBQWEsRUFBQTs7Ozs7OztBQ0ZiLFNBQWdCO0VBQ1osT0FBTyxTQUFRO0lBQ1g7TUFDSSxRQUFRLElBQUksbUJBQW1CLE9BQU8sZUFDdEMsUUFBUSxJQUFJO01BQ1osT0FBTyxLQUFLLFdBQVcsaUJBQWlCLFFBQVE7TUFDbEQsT0FBTztNQUNMLFFBQVEsSUFBSTs7O0FBR3hCOzs7OzRCQVZBLFFBQUE7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4a0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiJ9
