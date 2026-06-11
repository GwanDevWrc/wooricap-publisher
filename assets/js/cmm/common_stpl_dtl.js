 /**********************************************************************************************
  **********************************************************************************************
  ****** ####### 湲곌컙怨� ���ν븷 �쎄� 遺�媛��뺣낫 留ㅽ븨 #######
  ****** 1. �붾㈃蹂� �ㅼ씠�됲듃怨좉컼�숈쓽泥섎━援щ텇肄붾뱶 媛� 留ㅽ븨�뺣낫
  ******   - asisScnId ��ぉ�� �⑥닚 李멸퀬�⑹쑝濡� �ㅼ젣 �ъ슜�섏� �딆쓬
  ****** 2. �쎄�蹂� 湲곌컙怨� �꾨Ц 而щ읆 留ㅽ븨�뺣낫
  ******   - asisStplId, colOrg ��ぉ�� �⑥닚 李멸퀬�⑹쑝濡� �ㅼ젣 �ъ슜�섏� �딆쓬
  **********************************************************************************************
  **********************************************************************************************/


// �붾㈃蹂� �ㅼ씠�됲듃怨좉컼�숈쓽泥섎━援щ텇肄붾뱶 留ㅽ븨 �뺣낫
var scnIdCustAgrData = [

    // sample - �몄쬆�붾㈃ 
    { tobeScnId: "sampleAuth", asisScnId: "", drctCustAgrProcsDvcd: "UCR007" },
    { tobeScnId: "sampleElecAgre", asisScnId: "", drctCustAgrProcsDvcd: "UCR007" },
    // sample - �쎄��붾㈃ 
    { tobeScnId: "sampleStpl", asisScnId: "", drctCustAgrProcsDvcd: "EXT001" },
    // sample - ocr 
    //{ tobeScnId: "sampleOcr", asisScnId: "", drctCustAgrProcsDvcd: "CLS001" },  
    // 媛쒖씤湲덉쑖>(P)�곹뭹/�쒕퉬�� �곷떞�� �덈궡 �숈쓽
    { tobeScnId: "jcmmagr3100", asisScnId: "jcmmagr3100", drctCustAgrProcsDvcd: "RE" },
    
    // 踰뺤씤�꾩옄�쎌젙>怨꾩빟��>由ъ뒪
    { tobeScnId: "JCRPTNCRLES0192", asisScnId: "MDCRPTRELES0192", drctCustAgrProcsDvcd: "NCR004" },
    // 踰뺤씤�꾩옄�쎌젙>怨꾩빟��>�щ━��
    { tobeScnId: "JCRPTNCRRELES0192", asisScnId: "MDCRPTRELES0192", drctCustAgrProcsDvcd: "NCR004" },
    // 踰뺤씤�꾩옄�쎌젙>怨꾩빟��>�뚰듃
    { tobeScnId: "JCRPTNCRRNT0193", asisScnId: "MDCRPTNCRRNT0193", drctCustAgrProcsDvcd: "NCR006" },
    // 踰뺤씤�꾩옄�쎌젙>怨꾩빟��>�щ젋��
    { tobeScnId: "JCRPTNCRRERNT0193", asisScnId: "MDCRPTRERNT0193", drctCustAgrProcsDvcd: "NCR006" },
    // 踰뺤씤�꾩옄�쎌젙>怨꾩빟��>以묎퀬李�
    { tobeScnId: "JCRPTUCR0192", asisScnId: "MDCRPTUCR0192", drctCustAgrProcsDvcd: "UCR001" },
    // 踰뺤씤�꾩옄�쎌젙>怨꾩빟��>�닿뎄��
    { tobeScnId: "JCRPTDRGD0192", asisScnId: "MDCRPTDRGD0192", drctCustAgrProcsDvcd: "UCR001" },
    // 踰뺤씤�꾩옄�쎌젙>蹂댁쬆��>由ъ뒪
    { tobeScnId: "JCRPTNCRLES0222", asisScnId: "MDCRPTNCRLES0221", drctCustAgrProcsDvcd: "NCR004" },
    // 踰뺤씤�꾩옄�쎌젙>蹂댁쬆��>�щ━��
    { tobeScnId: "JCRPTNCRRELES0222", asisScnId: "MDCRPTRELES0221", drctCustAgrProcsDvcd: "NCR004" },
    // 踰뺤씤�꾩옄�쎌젙>蹂댁쬆��>�뚰듃
    { tobeScnId: "JCRPTNCRRNT0222", asisScnId: "MDCRPTNCRRNT0222", drctCustAgrProcsDvcd: "NCR006" },
    // 踰뺤씤�꾩옄�쎌젙>蹂댁쬆��>�щ젋��
    { tobeScnId: "JCRPTNCRRERNT0223", asisScnId: "MDCRPTRELES0222", drctCustAgrProcsDvcd: "NCR004" },
    // 踰뺤씤�꾩옄�쎌젙>蹂댁쬆��>以묎퀬李�
    { tobeScnId: "JCRPTUCR0223", asisScnId: "MDCRPTUCR0223", drctCustAgrProcsDvcd: "UCR001" },
    // 踰뺤씤�꾩옄�쎌젙>蹂댁쬆��>�닿뎄��
    { tobeScnId: "JCRPTDRGD0223", asisScnId: "MDCRPTDRGD0223", drctCustAgrProcsDvcd: "UCR001" },
    
    // 媛쒖씤湲덉쑖>���섎�異�_�좎슜/�먮룞李�>��異쒖씠�� �꾩엫�덉감 �숈쓽>�꾩엫�� �숈쓽��
    { tobeScnId: "JMVMMAN0020", asisScnId: "MDMVM0020", drctCustAgrProcsDvcd: "RLVR01" },
    // 媛쒖씤湲덉쑖>�먮룞李⑤떞蹂대�異�>��異쒖떊泥�젙蹂�>�꾩옄�쎌젙
    { tobeScnId: "JUCRUMR0310", asisScnId: "MDUMR0220", drctCustAgrProcsDvcd: "UCR005" },
    // 媛쒖씤湲덉쑖>�좎슜��異�>��異쒖떊泥�젙蹂�>�꾩옄�쎌젙
    { tobeScnId: "JPLNMAN0280", asisScnId: "MDPLN0280", drctCustAgrProcsDvcd: "PL001" },
    // 媛쒖씤湲덉쑖>���섎�異�_�좎슜/�먮룞李�>��異쒖떊泥�젙蹂�>�꾩옄�쎌젙
    { tobeScnId: "JMVMMAN0280", asisScnId: "JMVMMAN0280", drctCustAgrProcsDvcd: "PL001" },
    
    // 鍮꾨�硫댁뾽臾댁���>�⑤씪�몄꽌瑜� �깅줉>蹂몄씤�몄쬆
    { tobeScnId: "JDOCMAN0010", asisScnId: "MDDOC0010", drctCustAgrProcsDvcd: "" },
    // 鍮꾨�硫댁뾽臾댁���>�꾩옄�쎌젙>蹂몄씤�몄쬆
    { tobeScnId: "JDOCMAN0011", asisScnId: "MDDOC0011", drctCustAgrProcsDvcd: "" },
    
    // ODS>梨꾨Т議곗젙(�곹솚�좎삁)>�좎껌�쒖옉��
    { tobeScnId: "JODSDEBTADJ0020", asisScnId: "MDODSDEBTADJ0020", drctCustAgrProcsDvcd: "" },
    // ODS>媛쒖씤梨꾨Т�먮낫�몃쾿>�좎껌�쒖옉��
    { tobeScnId: "JODSDEBTADJ0120", asisScnId: "MDODSDEBTADJ0120", drctCustAgrProcsDvcd: "" },
    // ODS>李⑤웾�좎��숈쓽>�좎껌�쒖옉��
    { tobeScnId: "JODSVHCLMNTNAGR0020", asisScnId: "MDODSVHCLMNTNAGR0020", drctCustAgrProcsDvcd: "" },
    // ODS>梨꾧텒�좉퇋�ъ뾽�먮벑濡�>蹂몄씤�몄쬆
    { tobeScnId: "JBNDMAN0010", asisScnId: "MDODSUCR0010", drctCustAgrProcsDvcd: "" },
    // ODS>以묎퀬李⑤줎>�좎슜�뺣낫議고쉶
    { tobeScnId: "JODSUCR0010", asisScnId: "MDODSUCR0010", drctCustAgrProcsDvcd: "" },
    // ODS>以묎퀬李⑤줎>怨꾩빟�좎껌>�꾩옄�쎌젙
    { tobeScnId: "JODSUCR0310", asisScnId: "MDODSUCR0220", drctCustAgrProcsDvcd: "UCR001" },
    // ODS>以묎퀬�뚰듃>怨꾩빟�좎껌>�꾩옄�쎌젙 
    { tobeScnId: "JODSUCRRNT0196", asisScnId: "MDODSUCRRNT0196", drctCustAgrProcsDvcd: "NCR006" },
    // ��異쒖떊泥� 怨듯넻 >怨꾩빟�좎껌>�곹빀�� �ㅻ챸��>��異쒖긽�댁궗 �섎Т�ы빆
    { tobeScnId: "JCMMLCA1130", asisScnId: "JCMMLCA1130", drctCustAgrProcsDvcd: "RE" },
    
    // ODS>湲덉쑖�뚮퉬�먮낫�몃쾿(TM)>�먮룞李⑤떞蹂대�異�,媛쒖씤�좎슜��異�
    { tobeScnId: "JPLNMAN0110", asisScnId: "JPLNMAN0110", drctCustAgrProcsDvcd: "RE" },
    // ODS > 由ъ뒪 �좎슜�뺣낫議고쉶 �숈쓽
    { tobeScnId: "JODSNCRLES0010", asisScnId: "MDODSNCRLES0010", drctCustAgrProcsDvcd: "" },
    // ODS > 由ъ뒪 �꾩옄�쎌젙 > �꾩옄�쎌젙
    { tobeScnId: "JODSNCRLES0195", asisScnId: "JODSNCRLES0195", drctCustAgrProcsDvcd: "NCR004" },
    // ODS > 由ъ뒪 �꾩옄�쎌젙 > �꾩옄�쎌젙
    { tobeScnId: "JODSNCRLES0196", asisScnId: "MDODSNCRLES0196", drctCustAgrProcsDvcd: "NCR004" },
    // ODS > �뚰듃 �좎슜�뺣낫議고쉶 �숈쓽
    { tobeScnId: "JODSNCRRNT0010", asisScnId: "MDODSNCRRNT0010", drctCustAgrProcsDvcd: "" },
    // ODS > �뚰듃 �꾩옄�쎌젙 > �꾩옄�쎌젙
    { tobeScnId: "JODSNCRRNT0195", asisScnId: "MDODSNCRRNT0196", drctCustAgrProcsDvcd: "NCR006" },
    // ODS > �щ━�ㅼ옱�뚰듃 �좎슜�뺣낫議고쉶 �숈쓽
    { tobeScnId: "JODSNCRRELESRERNT0010", asisScnId: "MDRELESRERNT0010", drctCustAgrProcsDvcd: "" },
    // ODS > �щ━�� �꾩옄�쎌젙 > �꾩옄�쎌젙
    { tobeScnId: "JODSNCRRELES0196", asisScnId: "MDRELES0196", drctCustAgrProcsDvcd: "NCR004" },
    // ODS > �щ젋�� �꾩옄�쎌젙 > �꾩옄�쎌젙
    { tobeScnId: "JODSNCRRERNT0196", asisScnId: "MDRERNT0196", drctCustAgrProcsDvcd: "NCR006" },
    // ODS > �닿뎄�� �좎슜�뺣낫議고쉶 �숈쓽
    { tobeScnId: "JODSDRGD0010", asisScnId: "MDODSDRGD0010", drctCustAgrProcsDvcd: "" },
    // ODS > �닿뎄�� �꾩옄�쎌젙 > �꾩옄�쎌젙
    { tobeScnId: "JODSDRGD0193", asisScnId: "MDODSDRGD0193", drctCustAgrProcsDvcd: "UCR001" },
    // ODS > 紐⑥쭛�� 媛쒖씤�좎슜��異� �좎슜�뺣낫議고쉶 �숈쓽
    { tobeScnId: "JODSPLN0010", asisScnId: "JODSPLN0010", drctCustAgrProcsDvcd: "" },
    // ODS > 紐⑥쭛�� 媛쒖씤�좎슜��異� �꾩옄�쎌젙
    { tobeScnId: "JODSPLN0191", asisScnId: "MDODSPLN0191", drctCustAgrProcsDvcd: "PL001" },
    // ODS > 紐⑥쭛�� 議곌굔蹂�寃� �꾩옄�쎌젙
    { tobeScnId: "JODSCDCH0190", asisScnId: "MDODSCDCH0190", drctCustAgrProcsDvcd: "PL001" },
    
    // ODS > �밴퀎由ъ뒪 > �꾩옄�쎌젙
    { tobeScnId: "JODSSUCSLES0010", asisScnId: "MDODSSUCSLES0010", drctCustAgrProcsDvcd: "NCR004" },
    { tobeScnId: "JODSSUCSLES0195", asisScnId: "MDODSSUCSLES0195", drctCustAgrProcsDvcd: "UCR001" },
    { tobeScnId: "JODSSUCSLES0196", asisScnId: "MDODSSUCSLES0196", drctCustAgrProcsDvcd: "NCR004" },
    
    // ODS > �밴퀎�뚰듃 > �꾩옄�쎌젙
    { tobeScnId: "JODSSUCSRNT0010", asisScnId: "MDODSSUCSRNT0010", drctCustAgrProcsDvcd: "NCR006" },
    { tobeScnId: "JODSSUCSRNT0195", asisScnId: "MDODSSUCSRNT0195", drctCustAgrProcsDvcd: "UCR001" },
    { tobeScnId: "JODSSUCSRNT0196", asisScnId: "MDODSSUCSRNT0196", drctCustAgrProcsDvcd: "NCR006" },
    
    // ODS>紐④린吏�>�꾩옄�쎌젙
    { tobeScnId: "JODSMRGG0191", asisScnId: "JODSMRGG0191", drctCustAgrProcsDvcd: "NCR001" },
    { tobeScnId: "JODSMRGG0192", asisScnId: "JODSMRGG0192", drctCustAgrProcsDvcd: "NCR001" },//TODO �섏젙
    
    // 媛쒖씤湲덉쑖>留덉��낅룞�� �앹뾽
    { tobeScnId: "JCMMAGR1630", asisScnId: "", drctCustAgrProcsDvcd: "CMM002" },
    
    // �몄빋 �좎뒪
    { tobeScnId: "JTOSSUMR0220", asisScnId: "MDTSUMR0220", drctCustAgrProcsDvcd: "UCR005" },
    { tobeScnId: "JTSUCRUMR0010", asisScnId: "JTSUCRUMR0010", drctCustAgrProcsDvcd: "CMM004" },
    { tobeScnId: "JTSUCRUMR0120", asisScnId: "JTSUCRUMR0120", drctCustAgrProcsDvcd: "RE" },
    { tobeScnId: "JTSUCRUMR0240", asisScnId: "JTSUCRUMR0240", drctCustAgrProcsDvcd: "RE" },
    { tobeScnId: "JTSUCRUMR0310", asisScnId: "MDTSUMR0220", drctCustAgrProcsDvcd: "UCR005" },
    
    // �몄빋 ����
    { tobeScnId: "JFDUCRUMR0010", asisScnId: "JFDUCRUMR0010", drctCustAgrProcsDvcd: "CMM004" },
    { tobeScnId: "JFDUCRUMR0240", asisScnId: "JFDUCRUMR0240", drctCustAgrProcsDvcd: "RE" },
    { tobeScnId: "JFDUCRUMR0310", asisScnId: "MDFDUMR0220", drctCustAgrProcsDvcd: "UCR005" },
    
    // 媛쒖씤湲덉쑖>�먮룞李⑤떞蹂대�異�>蹂몄씤�몄쬆
    { tobeScnId: "JUCRUMR0010", asisScnId: "MDUMR0010", drctCustAgrProcsDvcd: "" },
    // 媛쒖씤湲덉쑖>�좎슜��異�>蹂몄씤�몄쬆
    { tobeScnId: "JPLNMAN0010", asisScnId: "MDPLN0010", drctCustAgrProcsDvcd: "" },
    // 媛쒖씤湲덉쑖>���섎�異�>蹂몄씤�몄쬆
    { tobeScnId: "JMVMMAN0010", asisScnId: "MDMVM0010", drctCustAgrProcsDvcd: "" },
    // 媛쒖씤湲덉쑖>���섎�異�_�좎슜/�먮룞李�>��異쒖떊泥�젙蹂�>�꾩옄�쎌젙
    { tobeScnId: "JUCRUMR0251", asisScnId: "JUCRUMR0251", drctCustAgrProcsDvcd: "UCR005" },
    
    // 二쇳깮�대낫>HI紐④린吏�>�꾩옄�쎌젙
    { tobeScnId: "JMRGG0220", asisScnId: "MDMRGG0220", drctCustAgrProcsDvcd: "PL001" },
    
    // �섏씠紐④린吏� 二쇳깮�대낫��異�
    { tobeScnId: "JMRGG0010", asisScnId: "", drctCustAgrProcsDvcd: "" },
    
    // 以묎퀬李⑥긽�댁떊泥�
    { tobeScnId: "JUINMAN0051", asisScnId: "", drctCustAgrProcsDvcd: "" },
    
    // �좎슜�뺣낫議고쉶 怨듯넻
    { tobeScnId: "JCIFQAGRMAN0010", asisScnId: "MDCIFQAGR0010", drctCustAgrProcsDvcd: "" },
    
    // �ы썑愿�由� �붾㈃
    { tobeScnId: "JONLLON0023", asisScnId: "JONLLON0023", drctCustAgrProcsDvcd: "EXT001" },
    { tobeScnId: "JONLLON0024", asisScnId: "JONLLON0024", drctCustAgrProcsDvcd: "EXT001" },
    { tobeScnId: "JONLLON0029", asisScnId: "JONLLON0029", drctCustAgrProcsDvcd: "SUC001" },
    { tobeScnId: "JONLLON0038", asisScnId: "JONLLON0038", drctCustAgrProcsDvcd: "CLS001" },
    { tobeScnId: "JONLLON0039", asisScnId: "JONLLON0039", drctCustAgrProcsDvcd: "CLS001" },
    { tobeScnId: "JONLLON0040", asisScnId: "JONLLON0040", drctCustAgrProcsDvcd: "CLS001" },
    { tobeScnId: "JONLLON0018", asisScnId: "JONLLON0018", drctCustAgrProcsDvcd: "GUR001" },
    { tobeScnId: "JONLVIC0013", asisScnId: "JONLVIC0013", drctCustAgrProcsDvcd: "ADD001" },
    { tobeScnId: "JONLVIC0026", asisScnId: "JONLVIC0026", drctCustAgrProcsDvcd: "ADD001" },
    { tobeScnId: "JONLVIC0029", asisScnId: "JONLVIC0029", drctCustAgrProcsDvcd: "ADD001" },
    { tobeScnId: "JONLVIC0030", asisScnId: "JONLVIC0030", drctCustAgrProcsDvcd: "ADD001" },
    { tobeScnId: "JONLVIC0028", asisScnId: "JONLVIC0017", drctCustAgrProcsDvcd: "ADD001" },
    { tobeScnId: "JETCCAP0011", asisScnId: "JETCCAP0011", drctCustAgrProcsDvcd: "UCR007" },
    { tobeScnId: "JCSMITR0020", asisScnId: "JCSMITR0018", drctCustAgrProcsDvcd: "INT001" },
    { tobeScnId: "JCSTRQT0001", asisScnId: "JCSTRQT0001", drctCustAgrProcsDvcd: "CRP001" },
    { tobeScnId: "JFINRET0050", asisScnId: "JCSTRQT0001", drctCustAgrProcsDvcd: "CRP001" },
    
    //媛쒖씤�뚯썝媛���
    { tobeScnId: "JMEMIND0002", asisScnId: "JMEMIND0002", drctCustAgrProcsDvcd: "CMM002" },
    //踰뺤씤�뚯썝媛���
    { tobeScnId: "JMEMCPR0002", asisScnId: "JMEMCPR0002", drctCustAgrProcsDvcd: "CMM002" },
    // �쒕쪟諛쒓툒
    { tobeScnId: "JONLDCM0090", asisScnId: "", drctCustAgrProcsDvcd: "" },
    
    // 釉뚮┸吏�
    { tobeScnId: "JLOTUCR0020", asisScnId: "", drctCustAgrProcsDvcd: "" },  // 濡�뜲
    { tobeScnId: "JTOSUCR0020", asisScnId: "", drctCustAgrProcsDvcd: "" },  // �좎뒪
    { tobeScnId: "JUCRBRA0020", asisScnId: "", drctCustAgrProcsDvcd: "" },  // 釉뚮씪蹂댁퐫由ъ븘
    
    // �쒕뵫
    { tobeScnId: "JBZCLND0088", asisScnId: "", drctCustAgrProcsDvcd: "" },  // 李⑤웾 怨듬룞�뚯쑀��
    
    // �⑺넗留�
    { tobeScnId: "JFTRMAN0010", asisScnId: "", drctCustAgrProcsDvcd: "" },  // �⑺넗留�
    
    // �곕━硫ㅻ쾭��
    { tobeScnId: "JMBSJON0001", asisScnId: "JMBSJON0001", drctCustAgrProcsDvcd: "" }
    

];


// �쎄�蹂� �숈쓽 而щ읆
var stplIdAgrData = [
                      { tobeStplId: "A0101", asisStplId: "HH01H0101", col:"lnbzTxBsicStplAgrYn", colOrg: "lnbz_tx_bsic_stpl_agr_yn" },
                      { tobeStplId: "A0102", asisStplId: "HH01H0102", col:"elfnTxStplAgrYn", colOrg: "elfn_tx_stpl_agr_yn" },
                      { tobeStplId: "A0201", asisStplId: "HH03H0301", col:"atmbAulnStplAgrYn", colOrg: "atmb_auln_stpl_agr_yn" },
                      { tobeStplId: "A0202", asisStplId: "HH03H0302", col:"atmbInsFnncStplAgrYn", colOrg: "atmb_ins_fnnc_stpl_agr_yn" },
                      { tobeStplId: "A0203", asisStplId: "HH03H0303", col:"atmbLeasStplAgrYn", colOrg: "atmb_leas_stpl_agr_yn" },
                      { tobeStplId: "A0204", asisStplId: "HH03H0304", col:"lntrRtlStplAgrYn", colOrg: "lntr_rtl_stpl_agr_yn" },
                      { tobeStplId: "A0205", asisStplId: "HH03H0305", col:"ucrAulnStplAgrYn", colOrg: "ucr_auln_stpl_agr_yn" },
                      { tobeStplId: "A0206", asisStplId: "HH03H0306", col:"atmbMrtgLoanStplAgrYn", colOrg: "atmb_mrtg_loan_stpl_agr_yn" },
                      { tobeStplId: "A0207", asisStplId: "HH03H0307", col:"idvdCdlnStplAgrYn", colOrg: "idvd_cdln_stpl_agr_yn" },
                      { tobeStplId: "A0208", asisStplId: "HH03H0309", col:"atmbInsFnncStplAgrYn", colOrg: "atmb_ins_fnnc_stpl_agr_yn" },
                      { tobeStplId: "A0209", asisStplId: "HH03H0311", col:"rlesMrtgLoanStplAgrYn", colOrg: "rles_mrtg_loan_stpl_agr_yn" },
                      { tobeStplId: "A0301", asisStplId: "HH02H0201", col:"autoAccoTrsfStplAgrYn", colOrg: "auto_acco_trsf_stpl_agr_yn" },
                      { tobeStplId: "A0302", asisStplId: "HH02H0202", col:"atrsfEsnInfoOfrAgrYn", colOrg: "atrsf_esn_info_ofr_agr_yn" },
                      { tobeStplId: "A0303", asisStplId: "HH02H0203", col:"atrsfEsnInfoGthUsagYn", colOrg: "atrsf_esn_info_gth_usag_yn" },
                      { tobeStplId: "A0401", asisStplId: "HH05H0501", col:"mbrsJoingStplEsnAgrYn", colOrg: "mbrs_joing_stpl_esn_agr_yn" },
                      { tobeStplId: "A0402", asisStplId: "HH05H0502", col:"mbrsIdifEsnUsagYn", colOrg: "mbrs_idif_esn_usag_yn" },
                      { tobeStplId: "A0403", asisStplId: "HH05H0503", col:"mbrsIdifSelectUsagYn", colOrg: "mbrs_idif_select_usag_yn" },
                      { tobeStplId: "A0404", asisStplId: "HH05H0505", col:"mbrsIdifSelectOfrAgrYn", colOrg: "mbrs_idif_select_ofr_agr_yn" },
                      { tobeStplId: "A0405", asisStplId: "HH05H0504", col:"mbrsFnncGdsGdncSelectYn", colOrg: "mbrs_fnnc_gds_gdnc_select_yn" },
                      { tobeStplId: "A0405", asisStplId: "HH05H0504", col:"mbrsEtcSrvcGdncSelectYn", colOrg: "mbrs_etc_srvc_gdnc_select_yn" },
                      { tobeStplId: "A0502", asisStplId: "CC0600000", col:"idvdCrifGthUseAgrYn", colOrg: "idvd_crif_gth_use_agr_yn" },
                      { tobeStplId: "A0503", asisStplId: "FF0300000", col:"unqIdntInfoGthUseAgrYn", colOrg: "unq_idnt_info_gth_use_agr_yn" },
                      { tobeStplId: "A0601", asisStplId: "AA01A0101", col:"fnncSrvcUseStplAgrYn", colOrg: "fnnc_srvc_use_stpl_agr_yn" },        // + AA01A0182, AA07A0701
                      { tobeStplId: "A0602", asisStplId: "AA01A0102", col:"idvdInfoEsnUsagYn", colOrg: "idvd_info_esn_usag_yn" },       // + AA07A0707
                      { tobeStplId: "A0603", asisStplId: "EE01E0101", col:"fnncGdsGdncSelectUsagYn", colOrg: "fnnc_gds_gdnc_select_usag_yn" },
                      { tobeStplId: "A0604", asisStplId: "EE01E0102", col:"etcSrvcGdncSelectUsagYn", colOrg: "etc_srvc_gdnc_select_usag_yn" },
                      { tobeStplId: "A0605", asisStplId: "EE0200000", col:"idvdInfoSelectOfrAgrYn", colOrg: "idvd_info_select_ofr_agr_yn" },
                      
                      // TODO 而щ읆 ��湲곗쨷  + AA02A0213
                      { tobeStplId: "B0101", asisStplId: "AA02A0212", col:"", colOrg: "" }, 
                      
                      { tobeStplId: "B0102", asisStplId: "AA01A0173", col:"idvdInfoEsnUsagYn", colOrg: "idvd_info_esn_usag_yn" },               // + CC0100000 
                      //{ tobeStplId: "B0102", asisStplId: "AA01A0174", col:"idifEsnIqryProcsAgrYn", colOrg: "idif_esn_iqry_procs_agr_yn" },    // + G1
                      { tobeStplId: "B0102", asisStplId: "AA01A0174", col:"idifEsnUseProcsAgrYn", colOrg: "idif_esn_use_procs_agr_yn" },        // + G1
                      { tobeStplId: "B0102", asisStplId: "AA01A0175", col:"idifEsnIqryAgrYn", colOrg: "idif_esn_iqry_agr_yn" },                 // + CC0200000 
                      //{ tobeStplId: "B0102", asisStplId: "AA01A0176", col:"idvdInfoEsnPrvdRiAgrYn", colOrg: "idvd_info_esn_prvd_ri_agr_yn" }, // + G2
                      { tobeStplId: "B0102", asisStplId: "AA01A0176", col:"idifEsnIqryProcsAgrYn", colOrg: "idif_esn_iqry_procs_agr_yn" },      // + G2
                      { tobeStplId: "B0102", asisStplId: "AA01A0177", col:"idvdInfoEsnOfrAgrYn", colOrg: "idvd_info_esn_ofr_agr_yn" },          // + CC0300000 
                      //{ tobeStplId: "B0102", asisStplId: "AA01A0178", col:"idvdInfoSelectUsagYn", colOrg: "idvd_info_select_usag_yn" },       // + G3
                      { tobeStplId: "B0102", asisStplId: "AA01A0178", col:"idvdInfoEsnPrvdRiAgrYn", colOrg: "idvd_info_esn_prvd_ri_agr_yn" },   // + G3
                      { tobeStplId: "B0104", asisStplId: "CC0500000", col:"molitGthUseOfrAgrYn", colOrg: "molit_gth_use_ofr_agr_yn" },
                      { tobeStplId: "B0105", asisStplId: "CC0700000", col:"kftcUnqIdntGthUsagYn", colOrg: "kftc_unq_idnt_gth_usag_yn" },
                      { tobeStplId: "B0106", asisStplId: "CC0800000", col:"kftcIdifUseAndOfrAgrYn", colOrg: "kftc_idif_use_and_ofr_agr_yn" },
                      { tobeStplId: "B0107", asisStplId: "CC1200000", col:"sgiIdifThprOfrAgrYn", colOrg: "sgi_idif_thpr_ofr_agr_yn" },
                      { tobeStplId: "B0108", asisStplId: "CC1300000", col:"idcTofCnfrAgrYn", colOrg: "idc_tof_cnfr_agr_yn" },
                      { tobeStplId: "B0109", asisStplId: "AA01A0168", col:"dlrBzwkPacIdvdCrifYn", colOrg: "dlr_bzwk_pac_idvd_crif_yn" },
                      { tobeStplId: "B0110", asisStplId: "AA02A0214", col:"crptCnslIdifGthUseYn", colOrg: "crpt_cnsl_idif_gth_use_yn" },
                      { tobeStplId: "B0111", asisStplId: "CC0900000", col:"idvdInfoEsnUsagYn", colOrg: "idvd_info_esn_usag_yn" },
                      { tobeStplId: "B0111", asisStplId: "CC1000000", col:"idifEsnIqryAgrYn", colOrg: "idif_esn_iqry_agr_yn" },
                      { tobeStplId: "B0111", asisStplId: "CC1100000", col:"idvdInfoEsnOfrAgrYn", colOrg: "idvd_info_esn_ofr_agr_yn" },
                      { tobeStplId: "B0113", asisStplId: "", col:"kftcObnkIdifUseOfrAgrYn", colOrg: "kftc_obnk_idif_use_ofr_agr_yn" },
                      { tobeStplId: "B0114", asisStplId: "", col:"dnalAltrIdifOfrIqryAgrYn", colOrg: "dnal_altr_idif_ofr_iqry_agr_yn" },
                      { tobeStplId: "B0201", asisStplId: "DD01D0101", col:"fnncGdsGdncSelectUsagYn", colOrg: "fnnc_gds_gdnc_select_usag_yn" },
                      { tobeStplId: "B0202", asisStplId: "DD01D0102", col:"etcSrvcGdncSelectUsagYn", colOrg: "etc_srvc_gdnc_select_usag_yn" },
                      { tobeStplId: "B0203", asisStplId: "DD01D0104", col:"fnncGdsGdncSelectUsagYn", colOrg: "fnnc_gds_gdnc_select_usag_yn" },
                      { tobeStplId: "B0204", asisStplId: "DD01D0105", col:"etcSrvcGdncSelectUsagYn", colOrg: "etc_srvc_gdnc_select_usag_yn" },
                      { tobeStplId: "B0205", asisStplId: "DD02D0201", col:"idvdInfoSelectOfrAgrYn", colOrg: "idvd_Info_Select_Ofr_Agr_Yn" },
                      { tobeStplId: "B0206", asisStplId: "DD02D0202", col:"idvdInfoSelectOfrAgrYn", colOrg: "idvd_Info_Select_Ofr_Agr_Yn" },
                      { tobeStplId: "B0301", asisStplId: "BB01B0101", col:"prgsSgstIdifOfrAgrYn", colOrg: "prgs_sgst_idif_ofr_agr_yn" },
                      { tobeStplId: "B0303", asisStplId: "BB01B0105", col:"advtIdntSelectGthUsagYn", colOrg: "advt_idnt_select_gth_usag_yn" },  // + AD
                      { tobeStplId: "B0401", asisStplId: "AA01A0156", col:"cntrInfoOfrExtnsAcptYn", colOrg: "cntr_info_ofr_extns_acpt_yn" },
                      { tobeStplId: "B0402", asisStplId: "AA01A0157", col:"cntrInfoOfrSucsYn", colOrg: "cntr_info_ofr_sucs_yn" },
                      { tobeStplId: "B0403", asisStplId: "AA01A0158", col:"sucsCntrCondYn", colOrg: "sucs_cntr_cond_yn" },
                      { tobeStplId: "B0404", asisStplId: "AA01A0159", col:"cntrInfoOfrSucsScherYn", colOrg: "cntr_info_ofr_sucs_scher_yn" },
                      { tobeStplId: "B0405", asisStplId: "AA01A0160", col:"cntrInfoOfrCntrClsYn", colOrg: "cntr_info_ofr_cntr_cls_yn" },
                      { tobeStplId: "B0406", asisStplId: "AA01A0161", col:"cntrInfoOfrGurtrChngYn", colOrg: "cntr_info_ofr_gurtr_chng_yn" },
                      { tobeStplId: "B0407", asisStplId: "AA01A0162", col:"infoOfrDrvrAddtCtrrYn", colOrg: "info_ofr_drvr_addt_ctrr_yn" },
                      { tobeStplId: "B0408", asisStplId: "AA01A0163", col:"idifOfrDrvrAddtDrvrYn", colOrg: "idif_ofr_drvr_addt_drvr_yn" },
                      { tobeStplId: "B0409", asisStplId: "AA01A0164", col:"cntrInfoOfrExtnsTrprYn", colOrg: "cntr_info_ofr_extns_trpr_yn" },
                      { tobeStplId: "B0410", asisStplId: "AA01A0165", col:"cntrInfoOfrClsTrprYn", colOrg: "cntr_info_ofr_cls_trpr_yn" },
                      { tobeStplId: "B0411", asisStplId: "AA01A0166", col:"infoOfrGurtrChngTrprYn", colOrg: "info_ofr_gurtr_chng_trpr_yn" },
                      { tobeStplId: "B0412", asisStplId: "HH04H0416", col:"bndTrnrNotiAndAgrYn", colOrg: "bnd_trnr_noti_and_agr_yn" },
                      { tobeStplId: "B0413", asisStplId: "HH04H0419", col:"bndTrnrNotiAndAgrYn", colOrg: "bnd_trnr_noti_and_agr_yn" },
                      { tobeStplId: "B0501", asisStplId: "BB02B0201", col:"selfAthnIdifOfrAgrYn", colOrg: "self_athn_idif_ofr_agr_yn" },
                      { tobeStplId: "B0502", asisStplId: "FF0200000", col:"selfAthnIiprAgrYn", colOrg: "self_athn_iipr_agr_yn" },
                      { tobeStplId: "B0503", asisStplId: "BB02B0202", col:"cmcmEsnUseStplAgrYn", colOrg: "cmcm_esn_use_stpl_agr_yn" },
                      { tobeStplId: "B0504", asisStplId: "AA08A0804", col:"prtblPhnSelfCnfrStplYn", colOrg: "prtbl_phn_self_cnfr_stpl_yn" },
                      { tobeStplId: "B0505", asisStplId: "FF0100000", col:"selfAthnIiprAgrYn", colOrg: "self_athn_iipr_agr_yn" },
                      
                      // TODO 異붽� 而щ읆 ��湲� 以� + AA02A0208, AA02A0209, AA03A0302, AA07A0702, AA07A0708, AA01A0103, AA09A0901, AA09A0902, AA09A0903, AA09A0904
                      { tobeStplId: "B0506", asisStplId: "AA01A0103", col:"", colOrg: "" },
                      
                      { tobeStplId: "B0507", asisStplId: "", col:"kmspIdifGthUseOfrAgrYn", colOrg: "kmsp_idif_gth_use_ofr_agr_yn" },
                      { tobeStplId: "B0508", asisStplId: "", col:"kmspIdifKcbOfrAgrYn", colOrg: "kmsp_idif_kcb_ofr_agr_yn" },
                      { tobeStplId: "B0509", asisStplId: "", col:"kmspIdifMccoOfrAgrYn", colOrg: "kmsp_idif_mcco_ofr_agr_yn" },
                      { tobeStplId: "B0510", asisStplId: "", col:"kmspSrvcStplAgrYn", colOrg: "kmsp_srvc_stpl_agr_yn" },
                      { tobeStplId: "B0601", asisStplId: "BB01B0112", col:"mdtaIdifEsnUsagYn", colOrg: "mdta_idif_esn_usag_yn" },
                      { tobeStplId: "B0602", asisStplId: "BB01B0113", col:"mdtaIdifN3ChdOfrAgrYn", colOrg: "mdta_idif_n3_chd_ofr_agr_yn" },
                      { tobeStplId: "B0603", asisStplId: "BB01B0114", col:"mdtaAdifN3ChdOfrAgrYn", colOrg: "mdta_adif_n3_chd_ofr_agr_yn" },
                      { tobeStplId: "B0701", asisStplId: "GG01G0101", col:"scrpIdifEsnUsagYn", colOrg: "scrp_idif_esn_usag_yn" },
                      { tobeStplId: "B0702", asisStplId: "GG01G0102", col:"scrpIdifEsnIqryAgrYn", colOrg: "scrp_idif_esn_iqry_agr_yn" },
                      { tobeStplId: "B0901", asisStplId: "AA01A0169", col:"inrcDemdAppcGdncYn", colOrg: "inrc_demd_appc_gdnc_yn" },
                      { tobeStplId: "B0902", asisStplId: "AA01A0170", col:"inrcDemdAppcAgreYn", colOrg: "inrc_demd_appc_agre_yn" },
                      { tobeStplId: "C0206", asisStplId: "HH03H0310", col:"idvdCdlnAddtStplAgrYn", colOrg: "idvd_cdln_addt_stpl_agr_yn" },
                      { tobeStplId: "C0207", asisStplId: "HH03H0312", col:"rlesFxclSetpCntrCnfrYn", colOrg: "rles_fxcl_setp_cntr_cnfr_yn" },
                      { tobeStplId: "C0208", asisStplId: "HH03H0314", col:"mrggLoanAddtAgreCnfrYn", colOrg: "mrgg_loan_addt_agre_cnfr_yn" },
                      { tobeStplId: "C0209", asisStplId: "AA01A0167", col:"ucrInsFnncAlncAgreYn", colOrg: "ucr_ins_fnnc_alnc_agre_yn" },
                      { tobeStplId: "C0210", asisStplId: "HH04H0401", col:"fxclSetpCnshYn", colOrg: "fxcl_setp_cnsh_yn" },
                      { tobeStplId: "C0301", asisStplId: "HH04H0402", col:"lnmaAccpMndtSpcnAgrYn", colOrg: "lnma_accp_mndt_spcn_agr_yn" },
                      { tobeStplId: "C0302", asisStplId: "HH04H0404", col:"lntrRtlImprvSpcnAgrYn", colOrg: "lntr_rtl_imprv_spcn_agr_yn" },
                      { tobeStplId: "C0305", asisStplId: "HH04H0421", col:"lntrRtlImprvSpcnAgrYn", colOrg: "lntr_rtl_imprv_spcn_agr_yn" },
                      { tobeStplId: "C0306", asisStplId: "HH04H0405", col:"spcnFnncRentCnfrYn", colOrg: "spcn_fnnc_rent_cnfr_yn" },
                      { tobeStplId: "C0401", asisStplId: "HH04H0403", col:"leasCmltAgrYn", colOrg: "leas_cmlt_agr_yn" },
                      { tobeStplId: "C0502", asisStplId: "HH04H0414", col:"vsmpMtboCnfrYn", colOrg: "vsmp_mtbo_cnfr_yn" },
                      { tobeStplId: "D0608", asisStplId: "I1", col:"lnexVpPvntN1CnfrYn", colOrg: "lnex_vp_pvnt_n1_cnfr_yn" },
                      { tobeStplId: "D0608", asisStplId: "I2", col:"lnexVpPvntN2CnfrYn", colOrg: "lnex_vp_pvnt_n2_cnfr_yn" },
                      { tobeStplId: "D0608", asisStplId: "I3", col:"lnexVpPvntN3CnfrYn", colOrg: "lnex_vp_pvnt_n3_cnfr_yn" },
                      { tobeStplId: "D0601", asisStplId: "A1", col:"telUseSgstAgrYn", colOrg: "tel_use_sgst_agr_yn" },
                      { tobeStplId: "D0602", asisStplId: "A2", col:"smsUseSgstAgrYn", colOrg: "sms_use_sgst_agr_yn" },
                      { tobeStplId: "D0604", asisStplId: "A3", col:"dcmtUseSgstAgrYn", colOrg: "dcmt_use_sgst_agr_yn" },
                      { tobeStplId: "D0603", asisStplId: "A4", col:"emailUseSgstAgrYn", colOrg: "email_use_sgst_agr_yn" },
                      { tobeStplId: "D0605", asisStplId: "C1", col:"agreCfirmAgrYn", colOrg: "agre_cfirm_agr_yn" },                     // �쎌젙�뺤빟 ~~
                      { tobeStplId: "A0505", asisStplId: "C2", col:"loanRepayInpnMndtAgrYn", colOrg: "loan_repay_inpn_mndt_agr_yn" },   // ��異쒖젙蹂� �대엺 諛� �곹솚�꾩엫�� 愿��� �숈쓽 ~~~
                      { tobeStplId: "D0606", asisStplId: "D1", col:"rlOwnrCnfrYn", colOrg: "rl_ownr_cnfr_yn" },                         // case 1. 蹂몄씤 �좎슜�뺣낫 �쒓났�숈쓽(蹂댁쬆�� �뺤씤��) ~~~~
                      { tobeStplId: "D0607", asisStplId: "F1", col:"lnmaAccpMndtSpcnAgrYn", colOrg: "lnma_accp_mndt_spcn_agr_yn" },      // ��異쒖떊泥�씤 蹂몄씤�� ��異쒓툑�≪쓣 洹��ъ뿉�� ��~~~~
                      { tobeStplId: "C0213", asisStplId: "", col:"lscpHsmlAddtAgreYn", colOrg: "lscp_hsml_addt_agre_yn" },               //�앺솢�덉젙�먭툑 二쇳깮�대낫��異� 異붽��쎌젙��
                      { tobeStplId: "C0507", asisStplId: "", col:"vpDmgePvntSrvyRsltBitm", colOrg: "vp_dmge_pvnt_srvy_rslt_bitm" },      // 蹂댁씠�ㅽ뵾�� �덈갑 �뺤씤
                      { tobeStplId: "B0419", asisStplId: "", col:"loctInfoGthUsagYn", colOrg: "loct_info_gth_usag_yn" },      // �꾩튂�뺣낫�섏쭛�댁슜�숈쓽�щ� �뺤씤
                      { tobeStplId: "C0309", asisStplId: "", col:"lcredGdsSpcnAgrYn", colOrg: "lcred_gds_spcn_agr_yn" }      // ���좎슜�곹뭹�뱀빟�숈쓽�щ� �뺤씤

];


