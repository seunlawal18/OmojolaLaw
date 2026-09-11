// ============================================================
// SITE CONFIGURATION — Single source of truth
// Change any value here and it propagates throughout the site
// ============================================================

export const SITE_CONFIG = {
  firm: {
    name: 'Omojola Law',
    tagline: 'New Jersey Law Firm Protecting Your Rights',
    description:
      'We provide robust legal representation for restraining orders, DUI, domestic violence, immigration, and litigation. At Omojola Law, our experienced team is committed to protecting your rights with strategic, client-focused advocacy.',
  },

  attorney: {
    name: 'Ade Omojola',
    title: 'Attorney at Law',
    tagline: 'Relentless Problem Solving Approach',
    yearsExperience: 14,
    bio: 'Attorney Ade Omojola is a seasoned attorney with over 14 years in law practice and founder of the firm based in New Jersey. His approach emphasizes strategic advice, dedicated representation, protection of clients\' rights, and securing their interests.',
    education: [
      'Seton Hall University School of Law',
      'New Jersey City University',
    ],
    admissions: [
      'State of New Jersey',
      'United States District Court, New Jersey',
      'United States Court of Appeals, Third Circuit',
    ],
    imagePath: '/assets/attorney.png',
  },

  contact: {
    phone: '732.704.5021',
    phoneHref: 'tel:+17327045021',
    email: 'ade@omojola.law',
    emailHref: 'mailto:ade@omojola.law',
  },

  locations: [
    {
      city: 'Toms River',
      address: '1400 Hooper Ave, 2nd Floor',
      cityState: 'Toms River, New Jersey 08753',
      mapUrl: 'https://maps.google.com/?q=Omojola+Law+1400+Hooper+Ave+Toms+River+NJ+08753',
      // Search-based embed — resolves to the exact business listing as shown in screenshot
      embedUrl: 'https://maps.google.com/maps?q=Omojola+Law+Domestic+Violence+DUI+Lawyer+1400+Hooper+Ave+Toms+River+NJ+08753&output=embed&z=15',
      isPrimary: true,
    },
    {
      city: 'Newark',
      address: 'One Gateway Center, Suite 2600-A',
      cityState: 'Newark, NJ 07102',
      mapUrl: 'https://maps.google.com/?q=One+Gateway+Center+Newark+NJ+07102',
      embedUrl: '',
      isPrimary: false,
    },
    {
      city: 'Jersey City',
      address: '101 Hudson Street, Suite 2100-A',
      cityState: 'Jersey City, New Jersey 07302',
      mapUrl: 'https://maps.google.com/?q=101+Hudson+Street+Jersey+City+NJ+07302',
      embedUrl: '',
      isPrimary: false,
    },
  ],

  nav: [
    { label: 'Home',            href: '/' },
    { label: 'About Us',        href: '/about' },
    { label: 'Practice Areas',  href: '/#practice-areas' },
    { label: 'Legal Insights',  href: '/#legal-insights' },
    { label: 'Why Us',          href: '/#why-us' },
    { label: 'FAQ',             href: '/#faq' },
    { label: 'Contact Us',      href: '/#contact' },
  ],

  media: {
    // Drop your video here: /public/assets/courthouse-sequence.mp4
    videoPath: '/assets/courthouse-sequence.mp4',
    // Poster shown while video loads / as fallback
    videoPoster: '/assets/courthouse-poster.jpg',
    // Main color logo — used in navbar and favicon reference
    logoPath: '/assets/logo-color.png',
    // White version of logo — used in footer on dark background
    logoWhitePath: '/assets/logo-white.png',
  },

  reviews: {
    rating: 5.0,
    count: 13,
    platform: 'Google',
    googleReviewUrl: 'https://g.page/r/omojola-law/review',
    items: [
      {
        id: 1,
        author: 'B',
        initials: 'B',
        rating: 5,
        date: '1 year ago',
        text: 'I just want to express my sincere gratitude to Ade Omojola for being an exceptional attorney. From the very beginning, he demonstrated a deep understanding of my case and provided clear, concise guidance throughout the entire process. His professionalism and dedication were evident in every interaction.',
      },
      {
        id: 2,
        author: 'Jean-Louis Stephat',
        initials: 'JS',
        rating: 5,
        date: '1 year ago',
        text: 'My lawyer showed a deep understanding of my personal situation and gave me the best advice. He was always available and responded quickly to my questions. I highly recommend Omojola Law to anyone in need of quality legal representation.',
      },
      {
        id: 3,
        author: 'Doug Alan Campbell',
        initials: 'DC',
        rating: 5,
        date: '1 year ago',
        text: 'Going through my divorce wasn\'t easy, but having Mr. Omojola by my side made all the difference. He was compassionate, knowledgeable, and fought hard for my rights. I am grateful for his outstanding representation during such a difficult time.',
      },
      {
        id: 4,
        author: 'Micheal Nubi',
        initials: 'MN',
        rating: 5,
        date: '1 year ago',
        text: 'Barrister Omojola has handled many cases on my behalf and by extension for my family. He is a highly skilled, experienced, and result-oriented attorney. I have always been satisfied with the outcome of my cases. I highly recommend him.',
      },
      {
        id: 5,
        author: 'Maria R.',
        initials: 'MR',
        rating: 5,
        date: '1 year ago',
        text: 'Attorney Omojola was incredibly professional and thorough. He guided me through every step of my immigration case with patience and expertise. I am now a permanent resident thanks to his hard work and dedication.',
      },
    ],
  },

  practiceAreas: [
    {
      id: 'litigation',
      number: '01',
      title: 'Litigation',
      shortTitle: 'Litigation',
      description:
        'At times your rights may not be respected or your interests secured until a lawyer is involved. Omojola Law provides representation involving Consumer Fraud, Insurance/Banking, Commercial Disputes, Administrative Law, and Personal Injury.',
      href: '/practice/litigation',
      icon: 'Scale',
    },
    {
      id: 'domestic-violence-family',
      number: '02',
      title: 'Domestic Violence & Family Matters',
      shortTitle: 'Family Matters',
      description:
        'Domestic violence and family matters are sensitive issues, particularly because children and parental rights may be affected. Attorney Ade Omojola represents clients in matters involving restraining orders, child support, and related family concerns.',
      href: '/practice/domestic-violence-family',
      icon: 'Shield',
    },
    {
      id: 'dui-dwi',
      number: '03',
      title: 'DUI / DWI Defense',
      shortTitle: 'DUI/DWI Defense',
      description:
        'Whether facing a first DUI/DWI case or prior issues, Omojola Law provides robust and strategic defense concerning freedom, driving privileges, and finances.',
      href: '/practice/dui-dwi',
      icon: 'Gavel',
    },
    {
      id: 'immigration',
      number: '04',
      title: 'Immigration',
      shortTitle: 'Immigration',
      description:
        'Omojola Law provides strategic legal services for family-based immigration, deportation defense, investor and special immigrant visas, permanent residence, citizenship, and related immigration matters.',
      href: '/practice/immigration',
      icon: 'Globe',
    },
  ],

  // ── YouTube Legal Insights ─────────────────────────────────────────────
  // Titles/descriptions will be updated when video text is provided.
  // fullDescription is shown beside the video in the modal for easy reading.
  legalInsights: [
    {
      id: 'video-1',
      videoId: 'SmdaGd_HAJ8',
      title: 'Lawyer in New Jersey, Ade Omojola at Omojola Law',
      category: 'About the Firm',
      description: 'Meet Attorney Ade Omojola — founder of Omojola Law, a New Jersey firm dedicated to strategic legal representation across DUI, family law, immigration, and litigation.',
      fullDescription: 'This is an introduction to Attorney Ade Omojola and Omojola Law. Attorney Omojola is a seasoned New Jersey lawyer with over 14 years of experience, committed to providing strategic, client-focused legal representation. In this video he introduces himself, the firm, and the areas of law in which Omojola Law represents clients throughout New Jersey.',
      keyPoints: [] as string[],
    },
    {
      id: 'video-2',
      videoId: 'gZOLjRJHJL4',
      title: 'Lawyer Fees in Toms River, New Jersey',
      category: 'Legal Fees',
      description: 'Concerned about the cost of hiring a lawyer in Toms River, NJ? Attorney Ade Omojola explains how legal fees work and what clients can expect at Omojola Law.',
      fullDescription: 'Attorney Ade Omojola discusses how legal fees are structured at Omojola Law, including flat fee arrangements and flexible payment plans designed to make quality legal representation accessible. This video is intended to help prospective clients in Toms River and across New Jersey understand what to expect financially when seeking legal counsel — removing one of the biggest barriers to getting proper legal help.',
      keyPoints: [
        'Flat fees available for many types of cases',
        'Flexible payment plans to suit your situation',
        'Free initial consultation to discuss your matter',
        'Transparent pricing — no hidden surprises',
        'Call 732.704.5021 to discuss your case',
      ] as string[],
    },
    {
      id: 'video-3',
      videoId: 'lZo-qKi9Lg4',
      title: 'Three Types of Domestic Violence Cases in New Jersey',
      category: 'Domestic Violence & Family',
      description: 'A domestic violence case in New Jersey can involve three different legal processes — criminal charges, a restraining order, or a civil lawsuit. Attorney Omojola explains each.',
      fullDescription: `A domestic violence case in New Jersey can involve three different legal processes depending on the circumstances.\n\nThe first is a criminal domestic violence matter, where the prosecutor may bring charges against the accused person for an alleged crime under New Jersey's Prevention of Domestic Violence Act. For domestic violence laws to apply, the parties must have a qualifying relationship — such as spouses, family members, dating partners, or individuals who have lived together — and the alleged conduct must involve an act recognized under the law, such as assault, harassment, stalking, threats, or kidnapping.\n\nThe second type involves a restraining order, where an individual asks the court for protection and restrictions are placed on the other party. Unlike a criminal case, a restraining-order proceeding is a civil matter between individuals.\n\nThe third type involves civil litigation for damages, where an alleged victim may file a lawsuit seeking compensation for injuries, property damage, emotional distress, or other losses caused by the alleged conduct.\n\nBecause domestic violence matters can involve serious legal consequences, understanding the type of case involved is an important first step. Omojola Law helps clients throughout Jersey City and New Jersey navigate domestic violence, restraining-order, and related legal matters.`,
      keyPoints: [
        'Criminal charges — prosecutor brings case under the Prevention of Domestic Violence Act',
        'Restraining orders — civil process; TRO can be issued same day, FRO after hearing',
        'Civil litigation — victim may sue for damages including emotional distress',
        'Qualifying relationships include spouses, family, dating partners, and cohabitants',
        'Omojola Law represents clients in all three types of domestic violence proceedings',
      ] as string[],
    },
    {
      id: 'video-4',
      videoId: 'YtBnETKSrRg',
      title: 'Domestic Violence and Restraining Orders in New Jersey',
      category: 'Domestic Violence & Family',
      description: 'Attorney Ade Omojola explains criminal charges, restraining orders, and civil lawsuits in New Jersey domestic violence cases — and what a Final Restraining Order really means for your life.',
      fullDescription: `Domestic violence cases in Toms River, New Jersey, can involve different legal processes depending on the circumstances. Under New Jersey's Prevention of Domestic Violence Act, a matter may arise when individuals have a qualifying domestic relationship and an alleged act of domestic violence occurs.\n\nA criminal domestic violence matter occurs when the prosecutor brings charges for alleged conduct such as assault, harassment, stalking, threats, or kidnapping. These cases are handled by the State and may result in serious criminal consequences.\n\nA restraining-order case is a separate civil process. A Temporary Restraining Order (TRO) may be requested through the Superior Court Family Division or through law enforcement after an incident. If the legal requirements are met after a hearing, the temporary order may become a Final Restraining Order (FRO). A Final Restraining Order can have significant long-term consequences — affecting employment, professional licensing, firearm rights, and personal reputation because it becomes part of a person's legal record.\n\nIn some cases a matter may be resolved through a civil restraint negotiated by both parties. Other cases proceed to trial, where the petitioner must prove that a predicate act of domestic violence occurred and that continued protection is necessary.\n\nAt Omojola Law, Attorney Ade Omojola provides legal representation for clients facing domestic violence matters, restraining orders, litigation, immigration issues, and DUI/DWI cases. If you need a New Jersey domestic violence lawyer, contact Omojola Law to discuss your situation.`,
      keyPoints: [
        'Three paths: criminal charges, restraining order, or civil lawsuit for damages',
        'TRO can be issued same day — FRO hearing follows within 10 days',
        'A Final Restraining Order (FRO) becomes a permanent part of your legal record',
        'FROs can affect employment, licensing, and firearm rights',
        'Civil restraint is an alternative resolution available in some cases',
        'Omojola Law represents both petitioners and respondents in restraining-order matters',
      ] as string[],
    },
    {
      id: 'video-5',
      videoId: '2ZTv6QYzqOI',
      title: 'Getting A Domestic Violence Temporary Restraining Order in New Jersey',
      category: 'Domestic Violence & Family',
      description: 'A Temporary Restraining Order (TRO) in New Jersey can be obtained through the Superior Court Family Division or through law enforcement. Attorney Omojola explains both paths.',
      fullDescription: `A Temporary Restraining Order (TRO) can be requested in New Jersey through two main methods: by going directly to the Superior Court Family Division or through law enforcement after a domestic violence incident.\n\nRequesting a TRO Through the Court\nThe first way is by going to the Superior Court Family Division in the county where the matter is being handled. The person requesting protection completes the required forms, providing information about the relationship between the parties, the alleged incident, and why protection is being requested. Once completed, the paperwork is presented to a judge for review. The judge evaluates the information and may ask additional questions before deciding whether to issue a Temporary Restraining Order.\n\nRequesting a TRO Through the Police\nA TRO may also be requested through law enforcement — when someone goes directly to a police station or when police respond to a domestic violence incident. Officers may speak with the individuals involved and explain the option of requesting a restraining order. If the alleged victim chooses to request one, police may prepare the necessary information and contact a judge available to review the request.\n\nWhat Happens After a TRO Is Issued?\nA Temporary Restraining Order is not permanent. After it is issued, it must be served on the alleged defendant, who receives notice of the restrictions and the date to appear in court. At that hearing, both parties have the opportunity to present evidence and arguments. The court then decides whether the TRO should be dismissed or become a Final Restraining Order (FRO).\n\nBecause a Final Restraining Order can have serious long-term consequences — including effects on employment, licensing, and personal rights — anyone involved in a restraining-order matter should understand the legal process and their available options.`,
      keyPoints: [
        'TRO can be obtained at the Superior Court Family Division or through police',
        'Court reviews forms and may ask questions before issuing the order',
        'Police can contact a judge directly after a domestic violence incident',
        'TRO must be served on the defendant who then receives a court date',
        'At the hearing, the TRO may be dismissed or become a Final Restraining Order',
        'FROs carry serious long-term consequences — legal guidance is essential',
      ] as string[],
    },
    {
      id: 'video-6',
      videoId: 'HZWQsYI3psA',
      title: 'Domestic Violence Temporary Restraining Order in New Jersey Can Become A Final Restraining Order',
      category: 'Domestic Violence & Family',
      description: 'Before a TRO becomes a Final Restraining Order, the petitioner must prove two things in court. Attorney Omojola explains both legal requirements and what happens if either is not met.',
      fullDescription: `When a restraining-order matter goes to court in New Jersey, the person requesting protection must prove two important elements before a judge can issue a Final Restraining Order (FRO).\n\n1. A Predicate Act of Domestic Violence\nThe first requirement is showing that a predicate act occurred — evidence that the alleged defendant committed an action recognized as domestic violence under New Jersey law. Examples may include assault or physical harm, threatening messages, harassment, stalking, or other acts that violate the Prevention of Domestic Violence Act. The court must determine that a specific act occurred and that the conduct meets the legal requirements for domestic violence protection.\n\n2. A Need for Future Protection\nThe second requirement is showing that there is a concern the conduct may continue in the future without a restraining order. The court must consider whether protection is necessary to prevent additional harm or repeated behavior. The existence of a past incident alone is not always enough — the court must also determine whether a restraining order is needed moving forward.\n\nIf either of these two requirements is not proven, the court may dismiss the restraining-order case and the Temporary Restraining Order will not become a Final Restraining Order.\n\nBecause the outcome of a restraining-order hearing can have significant consequences — including effects on employment, licensing, and personal rights — it is important to understand the legal requirements and prepare the case properly.`,
      keyPoints: [
        'Two elements must be proven for a TRO to become a Final Restraining Order',
        'First: a predicate act of domestic violence must be established',
        'Predicate acts include assault, harassment, stalking, threats, and other offenses',
        'Second: there must be a reasonable concern the conduct will continue',
        'A past incident alone is not always sufficient — future risk must be shown',
        'Failure to prove either element may result in dismissal of the case',
      ] as string[],
    },
    {
      id: 'video-7',
      videoId: 'XW70QHalPXA',
      title: 'Consequences of a Restraining Order in New Jersey',
      category: 'Domestic Violence & Family',
      description: 'A Final Restraining Order is permanent unless modified by the court and affects employment, licensing, and reputation. Attorney Omojola explains what an FRO really means.',
      fullDescription: `A Final Restraining Order (FRO) is a serious legal matter that can have long-lasting consequences. When an FRO is entered against someone, it means a judge has reviewed the evidence presented by both sides and determined that legal protection is necessary for another individual.\n\nA Final Restraining Order can affect many areas of a person's life, including employment opportunities, professional goals, and personal reputation. If a background check reveals an FRO, employers or organizations reviewing an individual's history may have concerns about the circumstances surrounding the order.\n\nUnlike a Temporary Restraining Order, a Final Restraining Order can remain in place indefinitely unless it is later modified or removed through the court process.\n\nBecause of the serious impact it can have, a restraining-order matter should be taken very seriously from the beginning. Understanding the legal process, presenting evidence properly, and having experienced legal guidance can be critical when facing a potential Final Restraining Order.`,
      keyPoints: [
        'A Final Restraining Order can remain in place indefinitely',
        'FROs appear on background checks and can affect employment opportunities',
        'Professional licensing and firearm rights may also be impacted',
        'Unlike a TRO, an FRO does not automatically expire',
        'Modification or removal requires a separate court process',
        'Taking the matter seriously from the start is essential',
      ] as string[],
    },
    {
      id: 'video-8',
      videoId: 'clJ3CcSjWn0',
      title: "Prosecutor Can't Stop A Restraining Order Case in New Jersey",
      category: 'Domestic Violence & Family',
      description: 'A restraining order and a criminal domestic violence case are separate proceedings. Attorney Omojola explains the key differences and why the prosecutor controls criminal cases — not the victim.',
      fullDescription: `A restraining order and a criminal domestic violence case are two separate legal matters in New Jersey. Although they may arise from the same incident, they serve different purposes and follow different processes.\n\nA restraining order is not a criminal prosecution. It is a court order designed to provide protection by placing restrictions on the alleged offender — such as staying away from the alleged victim, their children, home, or workplace, and prohibiting communication through any means.\n\nA criminal domestic violence case is different. In a criminal matter, the prosecutor brings charges against the accused person on behalf of the State of New Jersey. The alleged conduct may involve offenses such as assault, kidnapping, harassment, stalking, or other crimes recognized under New Jersey law.\n\nUnlike a restraining-order case, the prosecutor controls whether a criminal case moves forward. Even if the alleged victim later decides they do not want to cooperate, the prosecutor may still choose to continue pursuing the charges based on the available evidence.\n\nIn contrast, a restraining-order proceeding is a civil matter between individuals. The person who requested the order may decide not to continue pursuing the matter, although the final outcome depends on the court process and legal requirements.\n\nUnderstanding the difference between these two proceedings is important because they involve different legal standards, different parties, and different potential consequences.`,
      keyPoints: [
        'Restraining order = civil matter between individuals; criminal case = State vs. defendant',
        'The prosecutor — not the victim — controls whether criminal charges proceed',
        'A victim choosing not to cooperate does not automatically end a criminal case',
        'Restraining-order cases can be withdrawn by the petitioner under certain conditions',
        'Both proceedings can run simultaneously from the same incident',
        'Different legal standards apply to each type of case',
      ] as string[],
    },
    {
      id: 'video-9',
      videoId: 'WGnPnniL5nM',
      title: 'Beating A Restraining Order Case in New Jersey',
      category: 'Domestic Violence & Family',
      description: 'A Final Restraining Order hearing can be resolved through trial or a civil restraint agreement. Attorney Omojola explains both outcomes and the legal strategy that makes the difference.',
      fullDescription: `When a restraining-order matter reaches the stage of a Final Restraining Order (FRO) hearing, there are two possible outcomes: the case may proceed to trial, or the parties may resolve the matter through a civil restraint.\n\nA civil restraint is a negotiated agreement between both parties. Instead of proceeding with a full trial, the parties and their attorneys discuss terms that resolve the dispute — addressing issues such as communication, living arrangements, personal property, or other concerns. Although a civil restraint is based on an agreement, it is still a court order once approved by a judge, and violations can result in legal consequences.\n\nRequirements for a Final Restraining Order Trial\nIf the matter proceeds to trial, the person requesting the FRO must prove two important elements. First, that a predicate act of domestic violence occurred under New Jersey's Prevention of Domestic Violence Act — such as assault, battery, threats, harassment, stalking, or kidnapping. Second, that there is a concern the alleged conduct may continue in the future without a restraining order.\n\nIf both requirements are proven, the court may enter a Final Restraining Order. If the requirements are not met, the case may be dismissed.\n\nThe Importance of Legal Strategy\nSuccessfully resolving a restraining-order matter often requires an attorney prepared to present the case at trial while also understanding how to negotiate effectively. Being ready to proceed with trial can provide important leverage when discussing a possible civil restraint.\n\nAt Omojola Law, Attorney Ade Omojola helps clients navigate restraining-order matters through negotiation, civil restraint agreements, and trial representation. Contact Omojola Law to discuss your restraining-order matter and understand the legal options available.`,
      keyPoints: [
        'Two paths to resolution: trial or civil restraint agreement',
        'A civil restraint is a negotiated court order — violations carry consequences',
        'Trial requires proving a predicate act AND a need for future protection',
        'If either element is not proven, the case may be dismissed',
        'Being trial-ready gives important leverage in civil restraint negotiations',
        'Omojola Law handles both negotiation and trial representation',
      ] as string[],
    },
    {
      id: 'video-10',
      videoId: '_vHsUHcsuD8',
      title: 'DUI (Driving Under the Influence) Charges in Newark, NJ',
      category: 'DUI / DWI Defense',
      description: 'How do attorneys handle DUI cases in New Jersey? Attorney Omojola explains the evidence review process, breath-test challenges, officer observations, and why legal representation matters.',
      fullDescription: `A DUI (driving under the influence) charge is a serious legal matter that requires careful review of the facts and evidence. DUI cases involve complex procedures, and mistakes during the process can make the situation more difficult to resolve.\n\nReviewing DUI Testing Procedures\nWhen an attorney handles a DUI case, one of the first steps is reviewing all available evidence. If an Alcotest or breath-testing machine was used, attorneys carefully examine whether proper procedures were followed — including whether the equipment was properly maintained, whether required standards were met, and whether the officer conducting the test was properly trained, licensed, and certified. Issues involving equipment maintenance, officer qualifications, or testing procedures may raise questions about whether the results can be relied upon.\n\nExamining Officer Observations\nEven if there are problems with breath-test evidence, the prosecution may still attempt to prove a DUI charge based on officer observations — including driving behavior, physical appearance, speech, coordination, or other signs of impairment. Because officer observations can still play an important role, attorneys review the entire investigation, including police reports, testing procedures, and the circumstances surrounding the stop.\n\nBuilding a DUI Defense Strategy\nThere is no single approach that applies to every DUI case. Attorneys evaluate the evidence, identify potential weaknesses, and determine the best strategy based on the specific circumstances. In some cases, issues with testing procedures may create opportunities for negotiation. In others, the matter may require presenting arguments in court.\n\nWhy Legal Representation Matters\nMany individuals make mistakes by trying to manage the process themselves without understanding the evidence, legal requirements, or possible consequences. An experienced DUI attorney can review the evidence, identify important issues, negotiate where appropriate, and protect the client's rights throughout the process.\n\nAt Omojola Law, Attorney Ade Omojola represents clients in DUI/DWI matters, domestic violence cases, litigation, immigration, and family law. Contact Omojola Law to discuss your situation and understand your legal options.`,
      keyPoints: [
        'Breath-test evidence can be challenged on equipment maintenance and officer certification',
        'Officer observations (behavior, appearance, coordination) can still support a DUI charge',
        'Every case requires a tailored defense strategy — no one-size-fits-all approach',
        'Issues with testing procedures may create negotiation opportunities',
        'Attempting to handle a DUI without an attorney can seriously harm your case',
        'Omojola Law reviews all evidence and protects your rights throughout the process',
      ] as string[],
    },
  ],

  serviceAreas: {
    intro: 'Omojola Law provides legal representation to clients throughout New Jersey, helping individuals navigate complex legal matters with experienced guidance and dedicated advocacy. The firm serves clients in areas including Newark, Jersey City, Essex County, Ocean County, Atlantic City, Toms River, Hudson County, and surrounding communities.',
    regions: ['Newark', 'Jersey City', 'Toms River', 'Essex County', 'Ocean County', 'Atlantic City', 'Hudson County'],
    sections: [
      {
        title: 'Family Law Matters',
        icon: 'Users',
        description: 'Family legal matters require a careful and experienced approach.',
        items: ['Child Custody', 'Child Support', 'Divorce Proceedings', 'Parenting Time & Visitation'],
      },
      {
        title: 'Immigration Law',
        icon: 'Globe',
        description: 'Navigating the U.S. immigration system can be challenging.',
        items: ['Family-Based Immigration', 'Investor & Special Immigrant Visas', 'Asylum & Deportation Defense'],
      },
      {
        title: 'Litigation',
        icon: 'Scale',
        description: 'Legal disputes often present intricate challenges.',
        items: ['Consumer Fraud', 'Insurance & Banking Disputes', 'Commercial Disputes', 'Administrative Law', 'Personal Injury'],
      },
      {
        title: 'DUI / DWI Defense',
        icon: 'ShieldAlert',
        description: 'Strategic defense to protect your license, freedom, and finances.',
        items: ['First-Offense DUI/DWI', 'Repeat Offense Defense', 'License Suspension Hearings', 'Breath-Test Challenges'],
      },
    ],
  },

  faq: [
    {
      q: 'What should I do after a domestic violence accusation in New Jersey?',
      a: 'If you are facing a domestic violence accusation in New Jersey, it is important to take the matter seriously and understand your legal rights. Avoid contacting the other party if a restraining order has been issued, as violating the order can create additional legal problems. Gather any relevant evidence, including messages, documents, photographs, or other information that may help explain your side of the situation. Domestic violence matters can involve both criminal charges and restraining-order proceedings, which follow different legal standards. Speaking with an experienced attorney can help you understand the process, prepare your defense, and protect your rights throughout the case.',
    },
    {
      q: 'What is the difference between a temporary and final restraining order?',
      a: 'A Temporary Restraining Order (TRO) is an emergency order issued by a judge before a full hearing takes place. It provides immediate protection and places restrictions on the defendant, such as no-contact requirements or limitations on communication. A Final Restraining Order (FRO) is issued only after a court hearing where both parties have the opportunity to present evidence and testimony. If the court finds that the legal requirements are satisfied, the temporary order may become permanent. Unlike a TRO, a Final Restraining Order can have long-term consequences and may affect employment, professional licensing, and other areas of life.',
    },
    {
      q: 'Can criminal charges and a restraining-order case happen at the same time?',
      a: 'Yes, criminal charges and a restraining-order case can happen at the same time because they are separate legal proceedings. A criminal domestic violence case is handled by the State of New Jersey through the prosecutor\'s office, and the prosecution must prove the case beyond a reasonable doubt. A restraining-order case is a civil matter between two individuals and uses a different legal standard. While both cases may arise from the same incident, they involve different courts, different procedures, and different possible outcomes. It is important to understand the distinction because defending against criminal charges does not automatically resolve a restraining-order matter.',
    },
    {
      q: 'What happens after a first DUI in New Jersey?',
      a: 'After a first DUI in New Jersey, the case begins with an investigation and review of the evidence collected by law enforcement. An attorney will typically examine the circumstances of the traffic stop, field sobriety testing, breath-test procedures, and officer observations. The outcome of a DUI case depends on many factors, including whether proper procedures were followed and whether the evidence can support the charge. A first DUI can still carry serious consequences, including penalties, driving-related consequences, insurance issues, and other long-term effects. Because DUI cases involve technical legal and evidentiary issues, having experienced legal guidance is important.',
    },
    {
      q: 'Can breath-test evidence be challenged?',
      a: 'Yes, breath-test evidence in a New Jersey DUI case can potentially be challenged. Breath-testing machines must be properly maintained, inspected, and operated according to required procedures. Officers conducting the testing must also meet certain training and certification requirements. An attorney may review whether the equipment was functioning correctly, whether maintenance records are accurate, and whether proper testing procedures were followed. Even when breath-test results exist, other factors may affect their reliability. Reviewing the details of the testing process can help identify possible weaknesses in the prosecution\'s evidence and determine the appropriate legal strategy.',
    },
    {
      q: 'What are the consequences of refusing a breath test?',
      a: 'Refusing a breath test in New Jersey can create additional legal consequences because drivers are generally required to provide a breath sample when lawfully requested by law enforcement. A refusal allegation may be handled separately from other DUI-related issues and can result in penalties, including fines, license-related consequences, and other court requirements. The circumstances surrounding the refusal are important, including whether proper instructions were provided and whether officers followed required procedures. Because refusal cases involve specific legal requirements, it is important to understand your rights and seek legal advice before making decisions about how to respond.',
    },
    {
      q: 'Does Omojola Law represent clients throughout New Jersey?',
      a: 'Yes. Omojola Law represents clients throughout New Jersey in matters involving domestic violence, restraining orders, criminal defense, DUI/DWI cases, immigration issues, and related litigation. The firm helps clients understand their legal options, prepare their cases, and navigate complex legal proceedings. Whether you are facing a domestic violence accusation, responding to a restraining order, or dealing with a DUI charge, having experienced legal representation can make a significant difference. Omojola Law works with clients to protect their rights and provide guidance throughout each stage of the legal process.',
    },
  ],

  whyChooseUs: [
    {
      title: 'Experience',
      body: 'Over 14 years of legal practice with a track record of successful outcomes across litigation, family law, DUI defense, and immigration.',
    },
    {
      title: 'Client-Centered',
      body: 'Legal strategies tailored to your individual circumstances, goals, and the unique demands of your case.',
    },
    {
      title: 'Transparent Fees',
      body: 'Flat fees and flexible payment plans designed so quality legal representation remains accessible.',
    },
    {
      title: 'Accessibility',
      body: '24/7 availability to address urgent legal matters — because legal emergencies do not keep business hours.',
    },
  ],
} as const
