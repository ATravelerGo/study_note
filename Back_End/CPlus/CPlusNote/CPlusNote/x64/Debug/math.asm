; Listing generated by Microsoft (R) Optimizing Compiler Version 19.41.34123.0 

include listing.inc

INCLUDELIB MSVCRTD
INCLUDELIB OLDNAMES

msvcjmc	SEGMENT
__86AB8177_math@cpp DB 01H
msvcjmc	ENDS
PUBLIC	?Multiply@@YAHHH@Z				; Multiply
PUBLIC	__JustMyCode_Default
EXTRN	_RTC_InitBase:PROC
EXTRN	_RTC_Shutdown:PROC
EXTRN	__CheckForDebuggerJustMyCode:PROC
;	COMDAT pdata
pdata	SEGMENT
$pdata$?Multiply@@YAHHH@Z DD imagerel $LN3
	DD	imagerel $LN3+64
	DD	imagerel $unwind$?Multiply@@YAHHH@Z
pdata	ENDS
;	COMDAT rtc$TMZ
rtc$TMZ	SEGMENT
_RTC_Shutdown.rtc$TMZ DQ FLAT:_RTC_Shutdown
rtc$TMZ	ENDS
;	COMDAT rtc$IMZ
rtc$IMZ	SEGMENT
_RTC_InitBase.rtc$IMZ DQ FLAT:_RTC_InitBase
rtc$IMZ	ENDS
;	COMDAT xdata
xdata	SEGMENT
$unwind$?Multiply@@YAHHH@Z DD 025051601H
	DD	01112316H
	DD	0700a0021H
	DD	05009H
xdata	ENDS
; Function compile flags: /Odt
;	COMDAT __JustMyCode_Default
_TEXT	SEGMENT
__JustMyCode_Default PROC				; COMDAT
	ret	0
__JustMyCode_Default ENDP
_TEXT	ENDS
; Function compile flags: /Odtp /RTCsu /ZI
;	COMDAT ?Multiply@@YAHHH@Z
_TEXT	SEGMENT
result$ = 4
a$ = 256
b$ = 264
?Multiply@@YAHHH@Z PROC					; Multiply, COMDAT
; File D:\Desktop\studyLogs\Back_End\CPlus\CPlusNote\CPlusNote\math.cpp
; Line 6
$LN3:
	mov	DWORD PTR [rsp+16], edx
	mov	DWORD PTR [rsp+8], ecx
	push	rbp
	push	rdi
	sub	rsp, 264				; 00000108H
	lea	rbp, QWORD PTR [rsp+32]
	lea	rcx, OFFSET FLAT:__86AB8177_math@cpp
	call	__CheckForDebuggerJustMyCode
	npad	1
; Line 7
	mov	eax, DWORD PTR a$[rbp]
	imul	eax, DWORD PTR b$[rbp]
	mov	DWORD PTR result$[rbp], eax
; Line 8
	mov	eax, DWORD PTR result$[rbp]
; Line 9
	lea	rsp, QWORD PTR [rbp+232]
	pop	rdi
	pop	rbp
	ret	0
?Multiply@@YAHHH@Z ENDP					; Multiply
_TEXT	ENDS
END